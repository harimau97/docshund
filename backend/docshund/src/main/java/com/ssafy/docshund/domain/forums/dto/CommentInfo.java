package com.ssafy.docshund.domain.forums.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ssafy.docshund.domain.forums.entity.Comment;
import com.ssafy.docshund.domain.forums.entity.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentInfo {
	private Integer articleId;
	private Integer commentId;
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Long userId;
	private String nickname;
	private String profileImage;
	private List<CommentInfo> replies;

	public static Optional<CommentInfo> from(Comment comment){
		Status status = comment.getStatus();
		boolean isHidden = (status == Status.INVISIBLE || status == Status.DELETED);

		if(isHidden && comment.getReplies().isEmpty()){
			return Optional.empty();
		}

		List<CommentInfo> filteredReplies = comment.getReplies().stream()
			.map(CommentInfo::from)
			.flatMap(Optional::stream)
			.collect(Collectors.toList());

		return Optional.of(new CommentInfo(
			comment.getArticle().getArticleId(),
			comment.getCommentId(),
			isHidden ? getHiddenContent(status) : comment.getContent(),
			comment.getCreatedAt(),
			comment.getUpdatedAt(),
			isHidden ? null : comment.getUser().getUserId(),
			isHidden ? "멍멍이" : comment.getUser().getNickname(),
			isHidden ? "defaultImage" : comment.getUser().getProfileImage(),
			filteredReplies
		));
	}

	private static String getHiddenContent(Status status) {
		return status == Status.DELETED ? "삭제된 댓글" : "숨김 처리된 댓글";
	}
}

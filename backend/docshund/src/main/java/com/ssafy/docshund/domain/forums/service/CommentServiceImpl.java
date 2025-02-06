package com.ssafy.docshund.domain.forums.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ssafy.docshund.domain.alerts.service.AlertsService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.docshund.domain.forums.dto.CommentDto;
import com.ssafy.docshund.domain.forums.dto.CommentInfoDto;
import com.ssafy.docshund.domain.forums.entity.Article;
import com.ssafy.docshund.domain.forums.entity.Comment;
import com.ssafy.docshund.domain.forums.repository.ArticleRepository;
import com.ssafy.docshund.domain.forums.repository.CommentRepository;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final ArticleRepository articleRepository;
	private final CommentRepository commentRepository;
	private final UserUtil userUtil;
	private final AlertsService alertsService;

	@Override
	@Transactional(readOnly = true)
	public List<CommentInfoDto> getCommentsByArticleId(Integer articleId) {

		List<Comment> comments = commentRepository.findAllByArticleId(articleId);

		return comments.stream()
			.map(CommentInfoDto::from)
			.flatMap(Optional::stream)
			.collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public List<CommentInfoDto> getCommentsByUserId(Long userId) {

		List<Comment> comments = commentRepository.findAllByUserId(userId);

		return comments.stream()
			.map(CommentInfoDto::from)
			.flatMap(Optional::stream)
			.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public CommentInfoDto createComment(Integer articleId, CommentDto commentDto) {

		Article article = articleRepository.findById(articleId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS ARTICLE"));

		User user = userUtil.getUser();
		if(user == null) {
			throw new AccessDeniedException("NO PERMISSION TO UNLOGINED USER");
		}

		Comment savedComment = commentRepository.save(new Comment(null, user, article, commentDto.getContent()));

		// 실시간 알림 보내기
		alertsService.sendCommentAlert(article, user);

		return new CommentInfoDto(savedComment.getArticle().getArticleId(), savedComment.getCommentId(),
			savedComment.getContent(),
			savedComment.getCreatedAt(), savedComment.getUpdatedAt(),
			savedComment.getUser().getUserId(), savedComment.getUser().getNickname(),
			savedComment.getUser().getProfileImage(), new ArrayList<>()
		);
	}

	@Override
	@Transactional
	public CommentInfoDto createReply(Integer articleId, Integer commentId, CommentDto commentDto) {

		Article article = articleRepository.findById(articleId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS ARTICLE"));

		Comment parentComment = commentRepository.findById(commentId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS COMMENT"));

		User user = userUtil.getUser();
		if(user == null) {
			throw new AccessDeniedException("NO PERMISSION TO UNLOGINED USER");
		}

		Comment savedComment = commentRepository.save(
			new Comment(parentComment, user, article, commentDto.getContent()));

		// 실시간 알림 보내기
		alertsService.sendCommentAlert(article, user);	// 게시글 작성자에게도 알림
		alertsService.sendCommentReplyAlert(parentComment, user);	// 댓글 작성자에게도 알림

		return new CommentInfoDto(savedComment.getArticle().getArticleId(), savedComment.getCommentId(),
			savedComment.getContent(),
			savedComment.getCreatedAt(), savedComment.getUpdatedAt(),
			savedComment.getUser().getUserId(), savedComment.getUser().getNickname(),
			savedComment.getUser().getProfileImage(), new ArrayList<>()
		);
	}

	@Override
	@Transactional
	public void updateComment(Integer articleId, Integer commentId, CommentDto commentDto) {

		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS COMMENT"));

		if (!comment.getArticle().getArticleId().equals(articleId)) {
			throw new AccessDeniedException("ARTICLE ID NOT MATCHED");
		}

		User user = userUtil.getUser();
		if (user == null || !comment.getUser().getUserId().equals(user.getUserId())) {
			throw new AccessDeniedException("NO PERMISSION FOR THIS COMMENT");
		}

		comment.modifyContent(commentDto.getContent());
	}

	@Override
	@Transactional
	public void deleteComment(Integer articleId, Integer commentId) {

		Article article = articleRepository.findById(articleId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS ARTICLE"));

		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS COMMENT"));

		if (!comment.getArticle().getArticleId().equals(articleId)) {
			throw new AccessDeniedException("ARTICLE ID NOT MATCHED");
		}

		User user = userUtil.getUser();
		if (user == null || !comment.getUser().getUserId().equals(user.getUserId())) {
			throw new AccessDeniedException("NO PERMISSION FOR THIS COMMENT");
		}

		comment.modifyToDelete();
	}
}

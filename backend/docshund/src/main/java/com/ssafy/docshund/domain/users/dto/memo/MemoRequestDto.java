package com.ssafy.docshund.domain.users.dto.memo;

import java.time.LocalDateTime;

import com.querydsl.core.annotations.QueryProjection;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemoRequestDto {
	private Integer memoId;
	private Long userId;
	@NotNull(message = "제목은 비워둘 수 없습니다.")
	private String title;
	@NotNull(message = "내용은 비워둘 수 없습니다.")
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	@QueryProjection
	public MemoRequestDto(Integer memoId, Long userId, String title, String content, LocalDateTime createdAt,
		LocalDateTime updatedAt) {
		this.memoId = memoId;
		this.userId = userId;
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

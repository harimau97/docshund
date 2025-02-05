package com.ssafy.docshund.domain.alerts.dto;

import java.time.LocalDateTime;

public record AlertOutputDto(
	Integer alertId,    // 알림 ID
	Long userId,    // 유저 ID
	Category category,  // 카테고리 (번역, 게시글, 댓글, 문의)
	Integer categoryId, //  카테고리 ID
	String title,   // 제목
	String content, // 내용
	LocalDateTime createdAt,    // 생성일
	LocalDateTime checkedAt // 확인일
) {
	public static AlertOutputDto setOutputDto(Integer alertId, Long userId, Category category,
		Integer categoryId, String title, String content,
		LocalDateTime createdAt, LocalDateTime checkedAt) {
		return new AlertOutputDto(alertId, userId, category, categoryId, title, content,
			createdAt, checkedAt);
	}
}

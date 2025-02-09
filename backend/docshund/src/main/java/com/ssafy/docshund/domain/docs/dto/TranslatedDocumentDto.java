package com.ssafy.docshund.domain.docs.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.docshund.domain.docs.entity.Status;
import com.ssafy.docshund.domain.docs.entity.TranslatedDocument;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TranslatedDocumentDto(
	Long transId,
	@NotNull(message = "원본 문서(문단)는 필수로 지정해야 합니다.")
	Integer originId,
	Long userId,
	@NotBlank(message = "번역 문서 내용은 필수 입력 값으로, 비어있거나 공백일 수 없습니다.")
	String content,
	@NotNull @Min(0)
	Integer reportCount,
	@NotNull
	Status status,
	LocalDateTime createdAt,
	LocalDateTime updatedAt,
	Integer likeCount,
	List<Long> likeUserIds
) {
	public static TranslatedDocumentDto fromEntity(TranslatedDocument translatedDocument,
		Integer likeCount, List<Long> likeUserIds) {
		return new TranslatedDocumentDto(
			translatedDocument.getTransId(),
			translatedDocument.getOriginDocument().getOriginId(),
			translatedDocument.getUser().getUserId(),
			translatedDocument.getContent(),
			translatedDocument.getReportCount(),
			translatedDocument.getStatus(),
			translatedDocument.getCreatedAt(),
			translatedDocument.getUpdatedAt(),
			likeCount,
			likeUserIds
		);
	}

	// 좋아요한 사용자 ID 추가
	public TranslatedDocumentDto withLikeUserIds(List<Long> likeUserIds) {
		return new TranslatedDocumentDto(
			this.transId, this.originId, this.userId, this.content,
			this.reportCount, this.status, this.createdAt, this.updatedAt, likeUserIds.size(), likeUserIds
		);
	}
}

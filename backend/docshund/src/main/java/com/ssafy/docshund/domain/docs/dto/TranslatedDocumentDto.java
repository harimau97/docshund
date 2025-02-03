package com.ssafy.docshund.domain.docs.dto;

import java.time.LocalDateTime;

import com.ssafy.docshund.domain.docs.entity.Status;
import com.ssafy.docshund.domain.docs.entity.TranslatedDocument;

public record TranslatedDocumentDto(
	Long transId,
	Integer originId,
	Long userId,
	String content,
	Integer reportCount,
	Status status,
	LocalDateTime createdAt,
	LocalDateTime updatedAt,
	Integer likeCount
) {
	public static TranslatedDocumentDto fromEntity(TranslatedDocument translatedDocument, Integer likeCount) {
		return new TranslatedDocumentDto(
			translatedDocument.getTransId(),
			translatedDocument.getOriginDocument().getOriginId(),
			translatedDocument.getUser().getUserId(),
			translatedDocument.getContent(),
			translatedDocument.getReportCount(),
			translatedDocument.getStatus(),
			translatedDocument.getCreatedAt(),
			translatedDocument.getUpdatedAt(),
			likeCount
		);
	}
}

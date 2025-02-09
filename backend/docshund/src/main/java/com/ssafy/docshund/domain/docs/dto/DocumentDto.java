package com.ssafy.docshund.domain.docs.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.global.validation.ValidEnum;

import jakarta.validation.constraints.NotNull;

public record DocumentDto(
	Integer docsId,
	@NotNull
	String documentCategory,
	@NotNull
	String documentName,
	String documentLogo,
	String documentVersion,
	Integer viewCount,
	Integer likeCount,  // Join을 통해 받아올 예정
	@NotNull @ValidEnum(enumClass = Position.class)
	Position position,
	@NotNull
	String license,
	String documentLink,
	LocalDateTime createdAt,
	List<Long> likeUserIds) {

	// 문서 조회용
	public static DocumentDto fromEntity(Document document, int likeCount, List<Long> likeUserIds) {
		return new DocumentDto(
			document.getDocsId(),
			document.getDocumentCategory(),
			document.getDocumentName(),
			document.getDocumentLogo(),
			document.getDocumentVersion(),
			document.getViewCount(),
			likeCount, // likeCount 기본값 0
			document.getPosition(),
			document.getLicense(),
			document.getDocumentLink(),
			document.getCreatedAt(),
			likeUserIds
		);
	}
}

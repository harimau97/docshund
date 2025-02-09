package com.ssafy.docshund.domain.docs.dto;

import com.ssafy.docshund.domain.docs.entity.OriginDocument;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record OriginDocumentDto(
	Integer originId,
	@NotNull(message = "문서는 필수로 지정해야합니다.")
	Integer docsId,
	@NotNull @Min(1)
	Integer pOrder,
	@NotNull @Size(max = 10)
	String tag,
	@NotNull
	String content) {

	public static OriginDocumentDto fromEntity(OriginDocument originDocument) {
		return new OriginDocumentDto(
			originDocument.getOriginId(),
			originDocument.getDocument().getDocsId(),
			originDocument.getPOrder(),
			originDocument.getTag(),
			originDocument.getContent()
		);
	}
}

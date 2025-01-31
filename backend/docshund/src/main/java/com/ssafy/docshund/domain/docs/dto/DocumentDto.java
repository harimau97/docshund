package com.ssafy.docshund.domain.docs.dto;

import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.entity.Position;
import java.time.LocalDateTime;


public record DocumentDto(
        Integer docsId,
        String documentCategory,
        String documentName,
        String documentLogo,
        String documentVersion,
        Integer viewCount,
        Integer likeCount,  // Join을 통해 받아올 예정
        Position position,
        String license,
        String documentLink,
        LocalDateTime createdAt) {
    // 문서 조회용
    public static DocumentDto fromEntity(Document document) {
        return new DocumentDto(
                document.getDocsId(),
                document.getDocumentCategory(),
                document.getDocumentName(),
                document.getDocumentLogo(),
                document.getDocumentVersion(),
                document.getViewCount(),
                0, // likeCount 기본값 0
                document.getPosition(),
                document.getLicense(),
                document.getDocumentLink(),
                document.getCreatedAt()
        );
    }
}

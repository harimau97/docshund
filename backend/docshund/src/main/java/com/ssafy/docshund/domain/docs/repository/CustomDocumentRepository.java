package com.ssafy.docshund.domain.docs.repository;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;

import java.util.List;

public interface CustomDocumentRepository {
    List<DocumentDto> findAllDocumentsWithLikes();

    DocumentDto findDocumentWithLikes(Integer docsId);
}

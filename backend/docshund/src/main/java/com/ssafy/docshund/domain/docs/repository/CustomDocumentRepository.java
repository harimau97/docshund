package com.ssafy.docshund.domain.docs.repository;

import java.util.List;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.TranslatedDocumentDto;
import com.ssafy.docshund.domain.docs.entity.TranslatedDocument;

public interface CustomDocumentRepository {

	// 베스트 번역본 조회
	List<TranslatedDocumentDto> findBestTrans(Integer docsId);

	// 특정 문단에 대한 번역본 전체 조회
	List<TranslatedDocumentDto> findTranslatedDocs(Integer docsId, Integer originId, String sort, String order);

}

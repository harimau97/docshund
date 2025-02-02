package com.ssafy.docshund.domain.docs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.OriginDocumentDto;

@Service
public interface DocsService {
	// 문서 전체 목록 불러오기
	List<DocumentDto> getAllDocuments();

	// 특정 문서 정보 불러오기
	DocumentDto getDocumentDetail(Integer docsId);

	// 문서 생성하기
	DocumentDto createDocument(DocumentDto documentdto);

	// 원본 조회하기
	List<OriginDocumentDto> getAllOriginDocuments(Integer docsId);

	// 특정 단락 원본 조회하기
	OriginDocumentDto getOriginDocumentDetail(Integer originId);

	// 원본 생성하기
	List<OriginDocumentDto> createOriginDocuments(Integer docsId, String content);

	DocumentDto toggleLikes(Integer docsId, long currentUserId);
}

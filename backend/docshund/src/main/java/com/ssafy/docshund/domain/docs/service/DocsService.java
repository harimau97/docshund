package com.ssafy.docshund.domain.docs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.OriginDocumentDto;
import com.ssafy.docshund.domain.docs.dto.TranslatedDocumentDto;
import com.ssafy.docshund.domain.users.entity.User;

@Service
public interface DocsService {
	// 문서 전체 목록 불러오기
	List<DocumentDto> getAllDocuments(String sort, String order);

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

	// 관심문서 등록/취소
	DocumentDto toggleLikes(Integer docsId, long currentUserId);

	// 특정 유저 관심 문서 조회
	List<DocumentDto> getLikesDocument(Integer userId);

	// 특정 문서 번역문 전체 조회
	List<TranslatedDocumentDto> getAllTranslatedDocuments(Integer docsId);

	// 특정 문서 베스트 번역 조회
	List<TranslatedDocumentDto> getBestTranslatedDocuments(Integer docsId);

	// 번역 작성하기
	TranslatedDocumentDto createTranslatedDocument(Integer docsId, Integer originId, User user, String content);

	// 특정 유저의 번역본 조회
	List<TranslatedDocumentDto> getUserTransDocument(long userId);

	// 번역 상세보기
	TranslatedDocumentDto getTranslatedDocumentDetail(Integer docsId, Integer transId);

	// 번역 수정하기
	TranslatedDocumentDto updateTranslatedDocument(Integer docsId, Integer transId);

	// 번역 삭제하기
	void deleteTranslatedDocument(Integer docsId, Integer transId);

	// 번역 투표 / 투표해제
	void toggleVotes(Integer docsId, Integer transId, Long userId);
}

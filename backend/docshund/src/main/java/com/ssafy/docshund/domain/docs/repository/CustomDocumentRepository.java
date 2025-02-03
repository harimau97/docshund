package com.ssafy.docshund.domain.docs.repository;

import java.util.List;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.TranslatedDocumentDto;
import com.ssafy.docshund.domain.docs.entity.TranslatedDocument;

public interface CustomDocumentRepository {

	// 문서 전체 조회 (좋아요 개수 포함)
	List<DocumentDto> findAllDocumentsWithLikes(String sort, String order);

	// 문서 상세 조회 (좋아요 개수 포함)
	DocumentDto findDocumentWithLikes(Integer docsId);

	// 좋아요 추가
	void addLike(Integer docsId, long currentUserId);

	// 특정유저의 관심문서 조회
	List<DocumentDto> findLikedDocumentsByUser(Long userId);

	// 전체 번역본 조회 (좋아요 개수 포함)
	List<TranslatedDocumentDto> findAllTransWithLikes(Integer docsId);

	// 베스트 번역본 조회 (좋아요 개수 포함)
	List<TranslatedDocumentDto> findBestTransWithLikes(Integer docsId);

	// 특정 문단에 대한 번역본 전체 조회 (좋아요 개수 포함)
	List<TranslatedDocumentDto> findTranslatedDocsWithLikes(Integer docsId, Integer originId, String sort, String order);
	
	// 특정 유저의 번역본 조회 (좋아요 개수 포함)
	List<TranslatedDocumentDto> findUserTransWithLikes(long userId);
	
	// 번역 상세 조회 (좋아요 개수 포함)
	TranslatedDocumentDto findTransWithLikes(Integer transId);

	// 유저가 좋아한 번역본 목록 조회 (좋아요 개수 포함)
	List<TranslatedDocumentDto> findUserLikedTrans(Long userId);
}

package com.ssafy.docshund.domain.docs.repository;

import java.util.List;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;

public interface CustomDocumentRepository {
	List<DocumentDto> findAllDocumentsWithLikes();

	DocumentDto findDocumentWithLikes(Integer docsId);

	boolean isLikedByUser(Integer docsId, long currentUserId);

	void addLike(Integer docsId, long currentUserId);

	void removeLike(Integer docsId, long currentUserId);

	int getLikeCount(Integer docsId);
}

package com.ssafy.docshund.domain.forums.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.domain.forums.dto.ArticleInfo;

public interface ArticleRepositoryCustom {
	Page<ArticleInfo> findAllArticles(String sort, Position filterPosition, String filterDocName,
		String keyword, String searchType, Pageable pageable, Long userId);

	Page<ArticleInfo> findArticlesByAuthorId(Long authorId, Pageable pageable, Long userId);

	Page<ArticleInfo> findArticlesLikedByUserId(Long userId, Pageable pageable);

	ArticleInfo findArticleById(Integer articleId, Long userId);
}

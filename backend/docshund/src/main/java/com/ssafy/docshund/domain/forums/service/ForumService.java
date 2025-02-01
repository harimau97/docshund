package com.ssafy.docshund.domain.forums.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.domain.forums.dto.ArticleInfo;

public interface ForumService {

	/* Article */

	Page<ArticleInfo> getArticles(String sort, Position filterPosition, String filterDocName,
		String keyword, String searchType, Pageable pageable);

	Page<ArticleInfo> getArticlesByUserId(Long authorId, Pageable pageable);

	Page<ArticleInfo> getArticlesLikedByUserId(Pageable pageable);

	ArticleInfo getArticleDetail(Integer articleId);
}

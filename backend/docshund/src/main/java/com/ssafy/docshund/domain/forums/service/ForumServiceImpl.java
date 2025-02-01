package com.ssafy.docshund.domain.forums.service;

import java.util.NoSuchElementException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.domain.forums.dto.ArticleInfo;
import com.ssafy.docshund.domain.forums.entity.Article;
import com.ssafy.docshund.domain.forums.repository.ArticleRepository;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForumServiceImpl implements ForumService {

	private final ArticleRepository articleRepository;
	private final UserUtil userUtil;

	/* Article */

	@Override
	public Page<ArticleInfo> getArticles(String sort, Position filter, String keyword, String searchType, Pageable pageable) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = null;

		if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal() instanceof String)) {
			user = userUtil.getUser();
		}

		Long userId = (user != null) ? user.getUserId() : 0L;

		return articleRepository.findAllArticles(sort, filter, keyword, searchType, pageable, userId);
	}

	@Override
	public Page<ArticleInfo> getArticlesByUserId(Long authorId, Pageable pageable) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = null;

		if (authentication != null && authentication.isAuthenticated()
			&& !(authentication.getPrincipal() instanceof String)) {
			user = userUtil.getUser();
		}

		Long userId = (user != null) ? user.getUserId() : 0L;

		return articleRepository.findArticlesByAuthorId(authorId, pageable, userId);
	}

	@Override
	public Page<ArticleInfo> getArticlesLikedByUserId(Pageable pageable) {

		return articleRepository.findArticlesLikedByUserId(userUtil.getUser().getUserId(), pageable);
	}

	@Override
	public ArticleInfo getArticleDetail(Integer articleId) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = null;

		if (authentication != null && authentication.isAuthenticated()
			&& !(authentication.getPrincipal() instanceof String)) {
			user = userUtil.getUser();
		}

		Long userId = (user != null) ? user.getUserId() : 0L;
		ArticleInfo articleInfo = articleRepository.findArticleById(articleId, userId);

		if (articleInfo == null) {
			throw new NoSuchElementException("NOT EXISTS ARTICLE");
		}
		return articleInfo;
	}
}

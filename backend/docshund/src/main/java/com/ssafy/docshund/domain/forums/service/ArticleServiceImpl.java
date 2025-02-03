package com.ssafy.docshund.domain.forums.service;

import java.util.NoSuchElementException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.domain.docs.repository.DocumentRepository;
import com.ssafy.docshund.domain.forums.dto.ArticleDto;
import com.ssafy.docshund.domain.forums.dto.ArticleInfoDto;
import com.ssafy.docshund.domain.forums.entity.Article;
import com.ssafy.docshund.domain.forums.repository.ArticleLikeRepository;
import com.ssafy.docshund.domain.forums.repository.ArticleRepository;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

	private final UserUtil userUtil;
	private final ArticleRepository articleRepository;
	private final ArticleLikeRepository articleLikeRepository;
	private final DocumentRepository documentRepository;

	@Override
	@Transactional
	public ArticleInfoDto createArticle(ArticleDto articleDto) {

		User user = userUtil.getUser();

		Document document = documentRepository.findByDocumentName(articleDto.getCategory())
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS CATEGORY"));

		Article savedArticle = articleRepository.save(
			new Article(user, document, articleDto.getTitle(), articleDto.getContent()));

		return new ArticleInfoDto(
			savedArticle.getArticleId(), savedArticle.getDocument().getDocsId(),
			savedArticle.getDocument().getPosition(),
			savedArticle.getDocument().getDocumentName(), savedArticle.getTitle(), savedArticle.getContent(),
			savedArticle.getCreatedAt(), savedArticle.getUpdatedAt(), 0, 0, 0,
			savedArticle.getUser().getUserId(), savedArticle.getUser().getNickname(),
			savedArticle.getUser().getProfileImage(), false
		);
	}

	@Override
	@Transactional
	public void updateArticle(Integer articleId, ArticleDto articleDto) {

		User user = userUtil.getUser();

		Article article = articleRepository.findById(articleId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS ARTICLE"));

		if (!article.getUser().getUserId().equals(user.getUserId())) {
			throw new AccessDeniedException("NO PERMISSION FOR THIS ARTICLE");
		}

		if (articleDto.getTitle() != null) {
			article.modifyTitle(articleDto.getTitle());
		}

		if (articleDto.getContent() != null) {
			article.modifyContent(articleDto.getContent());
		}

		if (articleDto.getCategory() != null) {
			Document document = documentRepository.findByDocumentName(articleDto.getCategory())
				.orElseThrow(() -> new NoSuchElementException("NOT EXISTS CATEGORY"));

			article.modifyDocument(document);
		}
	}

	@Override
	public Page<ArticleInfoDto> getArticles(String sort, Position filterPosition, String filterDocName,
		String keyword, String searchType, Pageable pageable) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = null;

		if (authentication != null && authentication.isAuthenticated()
			&& !(authentication.getPrincipal() instanceof String)) {
			user = userUtil.getUser();
		}

		Long userId = (user != null) ? user.getUserId() : 0L;

		return articleRepository.findAllArticles(sort, filterPosition, filterDocName, keyword, searchType, pageable,
			userId);
	}

	@Override
	public Page<ArticleInfoDto> getArticlesByUserId(Long authorId, Pageable pageable) {

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
	public Page<ArticleInfoDto> getArticlesLikedByUserId(Pageable pageable) {

		return articleRepository.findArticlesLikedByUserId(userUtil.getUser().getUserId(), pageable);
	}

	@Override
	public ArticleInfoDto getArticleDetail(Integer articleId) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = null;

		if (authentication != null && authentication.isAuthenticated()
			&& !(authentication.getPrincipal() instanceof String)) {
			user = userUtil.getUser();
		}

		Long userId = (user != null) ? user.getUserId() : 0L;
		ArticleInfoDto articleInfo = articleRepository.findArticleById(articleId, userId);

		if (articleInfo == null) {
			throw new NoSuchElementException("NOT EXISTS ARTICLE");
		}
		return articleInfo;
	}

	@Override
	@Transactional
	public void deleteArticle(Integer articleId) {

		Article article = articleRepository.findById(articleId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS ARTICLE"));

		if (!article.getUser().getUserId().equals(userUtil.getUser().getUserId())) {
			throw new AccessDeniedException("NO PERMISSION FOR THIS ARTICLE");
		}

		article.modifyToDelete();
	}

	@Override
	@Transactional
	public void likeArticle(Integer articleId) {

		Long userId = userUtil.getUser().getUserId();
		if (articleLikeRepository.existsLike(userId, articleId) == 1) {
			articleLikeRepository.deleteLike(userId, articleId);
		} else {
			articleLikeRepository.insertLike(userId, articleId);
		}
	}
}

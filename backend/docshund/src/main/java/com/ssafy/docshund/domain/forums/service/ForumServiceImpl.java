package com.ssafy.docshund.domain.forums.service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.domain.forums.dto.ArticleInfo;
import com.ssafy.docshund.domain.forums.dto.CommentInfo;
import com.ssafy.docshund.domain.forums.entity.Article;
import com.ssafy.docshund.domain.forums.entity.Comment;
import com.ssafy.docshund.domain.forums.repository.ArticleLikeRepository;
import com.ssafy.docshund.domain.forums.repository.ArticleRepository;
import com.ssafy.docshund.domain.forums.repository.CommentRepository;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForumServiceImpl implements ForumService {

	private final ArticleRepository articleRepository;
	private final ArticleLikeRepository articleLikeRepository;
	private final UserUtil userUtil;
	private final CommentRepository commentRepository;

	/* Article */

	@Override
	public Page<ArticleInfo> getArticles(String sort, Position filterPosition, String filterDocName,
		String keyword, String searchType, Pageable pageable) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = null;

		if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal() instanceof String)) {
			user = userUtil.getUser();
		}

		Long userId = (user != null) ? user.getUserId() : 0L;

		return articleRepository.findAllArticles(sort, filterPosition, filterDocName, keyword, searchType, pageable, userId);
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

	@Override
	@Transactional
	public void deleteArticle(Integer articleId) {

		Article article = articleRepository.findById(articleId)
			.orElseThrow(() -> new NoSuchElementException("NOT EXISTS ARTICLE"));

		if(!article.getUser().getUserId().equals(userUtil.getUser().getUserId())) {
			throw new AccessDeniedException("NO PERMISSION FOR THIS ARTICLE");
		}

		article.modifyToDelete();
	}

	@Override
	public void likeArticle(Integer articleId) {

		Long userId = userUtil.getUser().getUserId();
		if (articleLikeRepository.existsLike(userId, articleId) == 1) {
			articleLikeRepository.deleteLike(userId, articleId);
		} else {
			articleLikeRepository.insertLike(userId, articleId);
		}
	}

	/* Comment */

	@Override
	public List<CommentInfo> getCommentsByArticleId(Integer articleId) {

		List<Comment> comments = commentRepository.findAllByArticleId(articleId);

		return comments.stream()
			.map(CommentInfo::from)
			.flatMap(Optional::stream)
			.collect(Collectors.toList());
	}

	@Override
	public List<CommentInfo> getCommentsByUserId(Long userId) {

		List<Comment> comments = commentRepository.findAllByUserId(userId);

		return comments.stream()
			.map(CommentInfo::from)
			.flatMap(Optional::stream)
			.collect(Collectors.toList());
	}

}

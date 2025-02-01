package com.ssafy.docshund.domain.forums.controller;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.domain.forums.dto.ArticleDto;
import com.ssafy.docshund.domain.forums.dto.ArticleInfo;
import com.ssafy.docshund.domain.forums.service.ForumService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/docshund/forums")
public class ForumController {

	private final ForumService forumService;

	@GetMapping("/")
	public ResponseEntity<Page<ArticleInfo>> getArticleList(
		@RequestParam(required = false) String sort,
		@RequestParam(required = false) String filter,
		@RequestParam(required = false) String keyword,
		@RequestParam(required = false) String searchType,
		@PageableDefault(page = 0, size = 10) Pageable pageable
	) {
		Object parsedFilter = parseFilter(filter);
		Page<ArticleInfo> result = forumService.getArticles(
			Optional.ofNullable(sort).orElse("latest"),
			(parsedFilter instanceof Position) ? (Position) parsedFilter : null,
			(parsedFilter instanceof String) ? (String) parsedFilter : "",
			Optional.ofNullable(keyword).orElse(""),
			Optional.ofNullable(searchType).orElse(""),
			pageable
		);

		return ResponseEntity.ok(result);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<Page<ArticleInfo>> getArticleListByUser(
		@PathVariable(name = "userId") Long userId,
		@PageableDefault(page = 0, size = 10) Pageable pageable
	) {
		Page<ArticleInfo> result = forumService.getArticlesByUserId(userId, pageable);

		return ResponseEntity.ok(result);
	}

	@GetMapping("/likes")
	public ResponseEntity<Page<ArticleInfo>> getArticleLikes(
		@PageableDefault(page = 0, size = 10) Pageable pageable
	) {
		Page<ArticleInfo> result = forumService.getArticlesLikedByUserId(pageable);

		return ResponseEntity.ok(result);
	}

	@GetMapping("/{articleId}")
	public ResponseEntity<ArticleInfo> getArticle(
		@PathVariable(name = "articleId") Integer articleId
	) {
		ArticleInfo result = forumService.getArticleDetail(articleId);

		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/{articleId}")
	public ResponseEntity<Void> deleteArticle(
		@PathVariable Integer articleId
	) {
		forumService.deleteArticle(articleId);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{articleId}/likes")
	public ResponseEntity<Void> likeArticle(
		@PathVariable Integer articleId
	) {
		forumService.likeArticle(articleId);
		return ResponseEntity.noContent().build();
	}

	private Object parseFilter(String filter) {
		if (filter == null || filter.isEmpty()) {
			return null;
		}

		try {
			return Position.valueOf(filter.toUpperCase());
		} catch (IllegalArgumentException e) {
			return filter;
		}
	}
}

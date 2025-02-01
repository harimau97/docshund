package com.ssafy.docshund.domain.forums.controller;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.domain.forums.dto.ArticleInfo;
import com.ssafy.docshund.domain.forums.service.ForumService;

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
		Position filterPosition = parseFilter(filter);
		Page<ArticleInfo> result = forumService.getArticles(
			Optional.ofNullable(sort).orElse("latest"),
			filterPosition,
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


	private Position parseFilter(String filter) {
		if(filter == null || filter.isEmpty())
			return null;

		try{
			return Position.valueOf(filter);
		}catch(Exception e){
			throw new IllegalArgumentException("NOT EXISTS FILTER : " + filter);
		}
	}
}

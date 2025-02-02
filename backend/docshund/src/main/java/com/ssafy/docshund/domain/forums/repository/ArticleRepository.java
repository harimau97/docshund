package com.ssafy.docshund.domain.forums.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.docshund.domain.forums.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer>, ArticleRepositoryCustom{
}

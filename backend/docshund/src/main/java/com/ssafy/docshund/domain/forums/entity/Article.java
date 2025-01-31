package com.ssafy.docshund.domain.forums.entity;

import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.audit.BaseTimeEntityWithUpdatedAt;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "article")
public class Article extends BaseTimeEntityWithUpdatedAt {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "article_id")
	private Integer articleId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;  // 유저 정보 (user 테이블과 연결)

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "docs_id", nullable = false)
	private Document document;  // 문서 정보 (document 테이블과 연결)

	@Column(name = "title", nullable = false, length = 50)
	private String title;  // 게시글 제목

	@Column(name = "content", nullable = false, columnDefinition = "TEXT")
	private String content;  // 게시글 내용

	@Column(name = "view_cnt", nullable = false)
	private Integer viewCount;  // 조회수

	@Column(name = "report_cnt", nullable = false)
	private Integer reportCount;  // 신고 횟수

	@Column(name = "is_hidden", nullable = false)
	private Boolean isHidden;  // 신고로 인한 숨김 여부

}

package com.ssafy.docshund.domain.docs.entity;

import com.ssafy.docshund.global.audit.BaseTimeEntity;

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
@Table(name = "origin_document")
public class OriginDocument extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "origin_id")
	private Integer originId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "docs_id", nullable = false)
	private Document document;  // 문서 정보 (document 테이블과 연결)

	@Column(name = "p_order", nullable = false)
	private Integer pOrder;  // 문서 내 문단 순서

	@Column(name = "tag", nullable = false, length = 10)
	private String tag;  // 문단의 태그

	@Column(name = "content", nullable = false, columnDefinition = "LONGTEXT")
	private String content;  // 문단의 내용

}

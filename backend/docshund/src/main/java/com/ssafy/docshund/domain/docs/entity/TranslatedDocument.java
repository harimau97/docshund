package com.ssafy.docshund.domain.docs.entity;

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
@Table(name = "translated_document")
public class TranslatedDocument extends BaseTimeEntityWithUpdatedAt {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trans_id")
	private Long transId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "origin_id", nullable = false)
	private OriginDocument originDocument;  // 원본 문서와 연결 (origin_document 테이블과 연결)

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;  // 유저 정보 (user 테이블과 연결)

	@Column(name = "content", nullable = false, columnDefinition = "LONGTEXT")
	private String content;  // 유저가 작성한 코드의 마크업 형태로 저장

	@Column(name = "report_count", nullable = false)
	private Integer reportCount;

	@Column(name = "is_hidden", nullable = false)
	private Boolean isHidden;

}

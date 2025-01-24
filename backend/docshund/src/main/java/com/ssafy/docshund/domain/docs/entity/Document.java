package com.ssafy.docshund.domain.docs.entity;

import com.ssafy.docshund.global.audit.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "document")
public class Document extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "docs_id")
	private Integer docsId;

	@Column(name = "document_category", nullable = false)
	private String documentCategory;

	@Column(name = "document_name", nullable = false)
	private String documentName;

	@Column(name = "license", nullable = false)
	private String license;

	@Column(name = "document_link", nullable = false)
	private String documentLink;

	@Column(name = "view_count", nullable = false)
	private Integer viewCount;

	@Column(name = "document_version", nullable = false)
	private String documentVersion;

	@Column(name = "document_logo")
	private String documentLogo;

	@Enumerated(EnumType.STRING)
	@Column(name = "position")
	private Position position;
}

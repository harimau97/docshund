package com.ssafy.docshund.domain.users.entity;

import com.ssafy.docshund.global.audit.BaseTimeEntityWithUpdatedAt;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_info")
public class UserInfo extends BaseTimeEntityWithUpdatedAt {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_info_id")
	private Long userInfoId;

	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "is_darkmode", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
	private boolean isDarkmode;

	@Column(name = "hobby", length = 30)
	private String hobby;

	@Column(name = "introduce", length = 255)
	private String introduce;

	@Column(name = "report_count", nullable = false, columnDefinition = "INT DEFAULT 0")
	private int reportCount;

}

package com.ssafy.docshund.domain.users.entity;

import java.time.LocalDateTime;

import com.ssafy.docshund.global.audit.BaseTimeEntityWithUpdatedAt;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "user")
@Getter
public class User extends BaseTimeEntityWithUpdatedAt {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long userId;

	@Column(name = "email", nullable = false, unique = true, length = 100)
	private String email;

	@Column(name = "profile_image", length = 255)
	private String profileImage;

	@Column(name = "nickname", length = 20, unique = true)
	private String nickname;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false, columnDefinition = "ENUM('ROLE_USER', 'ROLE_ADMIN') DEFAULT 'ROLE_USER'")
	private Role role;

	@Column(name = "provider", nullable = false, length = 20)
	private String provider;

	@Column(name = "personal_id", length = 100)
	private String personalId;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false, columnDefinition = "ENUM('BANNED', 'WITHDRAWN', 'ACTIVE') DEFAULT 'ACTIVE'")
	private Status status;

	@Column(name = "last_login")
	private LocalDateTime lastLogin;

	@Column(name = "token", length = 255)
	private String token;

}

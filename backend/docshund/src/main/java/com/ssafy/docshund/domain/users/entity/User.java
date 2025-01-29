package com.ssafy.docshund.domain.users.entity;

import java.time.LocalDateTime;

import com.ssafy.docshund.domain.users.dto.auth.UserDTO;
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

	@Column(name = "profile_image")
	private String profileImage;

	@Column(name = "nickname", length = 20, unique = true)
	private String nickname;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false, columnDefinition = "ENUM('ROLE_USER', 'ROLE_ADMIN') DEFAULT 'ROLE_USER'")
	private Role role;

	@Enumerated(EnumType.STRING)
	@Column(name = "provider", nullable = false, length = 20)
	private Provider provider;

	@Column(name = "personal_id", length = 100)
	private String personalId;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false, columnDefinition = "ENUM('BANNED', 'WITHDRAWN', 'ACTIVE') DEFAULT 'ACTIVE'")
	private Status status;

	@Column(name = "last_login")
	private LocalDateTime lastLogin;

	@Column(name = "token")
	private String token;

	public static User createUser(UserDTO userDTO) {
		User user = new User();
		user.email = userDTO.getEmail();
		// default image 수정 필요
		user.profileImage = "https://cdn.discordapp.com/attachments/1325677272572891136/1334006138638958713/docshund.png?ex=679af588&is=6799a408&hm=29441a9c35dd323776e3a367f2cc18daea6dd7883f1cfef1a225f3b6a1bb63cb&";
		user.nickname = userDTO.getNickname();
		user.role = Role.ROLE_USER;
		user.provider = userDTO.getProvider();
		user.personalId = userDTO.getPersonalId();
		user.status = Status.ACTIVE;
		user.lastLogin = LocalDateTime.now();
		user.token = "a";
		return user;
	}

}

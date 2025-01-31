package com.ssafy.docshund.domain.users.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;
import com.ssafy.docshund.domain.users.entity.Hobby;
import com.ssafy.docshund.domain.users.service.UserQueryService;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/docshund/users")
public class UserController {

	private final UserQueryService userQueryService;
	private final UserUtil userUtil;

	@GetMapping
	public ResponseEntity<Page<UserAndInfoDto>> searchUsers(@RequestParam(required = false) String nickname,
		@RequestParam(required = false) String email, @RequestParam(required = false) Hobby category,
		Pageable pageable) {

		if (!userUtil.isAdmin(userUtil.getUser())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}

		UserSearchCondition condition = new UserSearchCondition(nickname, email, category);
		Page<UserAndInfoDto> users = userQueryService.searchUsers(condition, pageable);

		return ResponseEntity.ok(users);
	}

	//TODO: 유저 프로필 조회
	@GetMapping("/profile/{user_id}")
	public ResponseEntity<UserAndInfoDto> getProfileUser(@PathVariable Long user_id) {
		return ResponseEntity.ok(userQueryService.getUserProfile(user_id));
	}

	//TODO: 유저 프로필 수정

}

package com.ssafy.docshund.domain.users.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;
import com.ssafy.docshund.domain.users.dto.profile.ProfileRequestDto;
import com.ssafy.docshund.domain.users.entity.Hobby;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.service.UserQueryService;
import com.ssafy.docshund.domain.users.service.UserQueryServiceImpl;
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
	private final UserQueryServiceImpl userQueryServiceImpl;

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

	@GetMapping("/profile/{userId}")
	public ResponseEntity<UserAndInfoDto> getProfileUser(@PathVariable Long userId) {
		return ResponseEntity.ok(userQueryService.getUserProfile(userId));
	}

	@PatchMapping("/profile/{userId}")
	public ResponseEntity<String> modifyProfile(@PathVariable Long userId, @RequestBody ProfileRequestDto request) {
		User user = userUtil.getUser();
		if (!userUtil.isMine(userId, user))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("자신의 프로필이 아닙니다.");

		userQueryServiceImpl.modifyUserProfile(user, request);

		return ResponseEntity.ok("프로필이 수정되었습니다.");
	}
}

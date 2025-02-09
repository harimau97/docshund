package com.ssafy.docshund.domain.users.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.users.dto.memo.MemoRequestDto;
import com.ssafy.docshund.domain.users.dto.memo.MemoResponseDto;
import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserProfileDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;
import com.ssafy.docshund.domain.users.dto.profile.ProfileRequestDto;
import com.ssafy.docshund.domain.users.dto.profile.UserStatusRequestDto;
import com.ssafy.docshund.domain.users.entity.Hobby;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.service.UserService;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/docshund/users")
public class UserController {

	private final UserService userService;
	private final UserUtil userUtil;

	@GetMapping
	public ResponseEntity<Page<UserAndInfoDto>> searchUsers(@RequestParam(required = false) String nickname,
		@RequestParam(required = false) String email, @RequestParam(required = false) Hobby category,
		Pageable pageable) {

		User user = userUtil.getUser();

		if (user == null || !userUtil.isAdmin(user)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		UserSearchCondition condition = new UserSearchCondition(nickname, email, category);
		Page<UserAndInfoDto> users = userService.searchUsers(condition, pageable);

		return ResponseEntity.ok(users);
	}

	@GetMapping("/profile")
	public ResponseEntity<String> duplicatedUserNickname(@RequestParam String nickname) {
		return ResponseEntity.ok(userService.duplicateNickname(nickname));
	}

	@GetMapping("/profile/{userId}")
	public ResponseEntity<UserProfileDto> getProfileUser(@PathVariable Long userId) {
		UserProfileDto userProfile = userService.getUserProfile(userId);

		if (userProfile == null)
			return ResponseEntity.badRequest().build();

		return ResponseEntity.ok(userProfile);
	}

	@PatchMapping(value = "/profile/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> modifyProfile(@PathVariable Long userId,
		@RequestPart("profile") ProfileRequestDto request,
		@RequestPart(value = "file", required = false) MultipartFile file) {
		User user = userUtil.getUser();
		if (user == null || !userUtil.isMine(userId, user))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("자신의 프로필이 아닙니다.");

		userService.modifyUserProfile(user, request, file);

		return ResponseEntity.ok("프로필이 수정되었습니다.");
	}

	@PutMapping("/{userId}/status")
	public ResponseEntity<String> modifyUserStatus(@PathVariable Long userId,
		@RequestBody UserStatusRequestDto userStatusRequestDto) {

		userService.modifyUserStatus(userId, userStatusRequestDto);

		return ResponseEntity.ok("상태가 변경되었습니다.");
	}

	// 메모 생성
	@PostMapping("/{userId}/memo")
	public ResponseEntity<Map<String, String>> createMemo(
		@PathVariable Long userId,
		@RequestBody MemoRequestDto memoRequestDto) {

		userService.createMemo(userId, memoRequestDto);

		return ResponseEntity.ok(Map.of("message", "메모가 생성되었습니다."));
	}

	// 메모 조회 (단일)
	@GetMapping("/{userId}/memo/{memoId}")
	public ResponseEntity<MemoResponseDto> getMemo(
		@PathVariable Long userId,
		@PathVariable Integer memoId) {

		// 메모 조회
		MemoResponseDto memo = userService.getMemo(userId, memoId);

		return ResponseEntity.ok(memo);
	}

	// 메모 조회 (일괄, 프론트에서 페이지네이션 처리)
	@GetMapping("/{userId}/memo")
	public ResponseEntity<List<MemoResponseDto>> getMemos(
		@PathVariable Long userId) {

		// 메모 조회
		List<MemoResponseDto> memos = userService.getMemos(userId);

		return ResponseEntity.ok(memos);
	}

	// 메모 수정
	@PatchMapping("/{userId}/memo/{memoId}")
	public ResponseEntity<Map<String, String>> modifyMemo(
		@PathVariable Long userId,
		@PathVariable Integer memoId,
		@RequestBody MemoRequestDto memoRequestDto) {

		// 메모 수정
		userService.modifyMemo(userId, memoId, memoRequestDto);

		return ResponseEntity.ok(Map.of("message", "메모가 수정되었습니다."));
	}

	// 메모 삭제
	@DeleteMapping("/{userId}/memo/{memoId}")
	public ResponseEntity<Map<String, String>> deleteMemo(
		@PathVariable Long userId,
		@PathVariable Integer memoId) {

		// 메모 삭제
		userService.deleteMemo(userId, memoId);

		return ResponseEntity.ok(Map.of("message", "메모가 삭제되었습니다."));
	}

}

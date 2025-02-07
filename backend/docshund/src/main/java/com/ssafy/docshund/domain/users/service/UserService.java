package com.ssafy.docshund.domain.users.service;

import com.ssafy.docshund.domain.users.dto.memo.MemoRequestDto;
import com.ssafy.docshund.domain.users.dto.memo.MemoResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserProfileDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;
import com.ssafy.docshund.domain.users.dto.profile.ProfileRequestDto;
import com.ssafy.docshund.domain.users.entity.User;

import java.util.List;

public interface UserService {

	public Page<UserAndInfoDto> searchUsers(UserSearchCondition condition, Pageable pageable);

	public UserProfileDto getUserProfile(Long userId);

	public void modifyUserProfile(User user, ProfileRequestDto profileRequestDto, MultipartFile file);

	// 메모 생성
    void createMemo(Long userId, MemoRequestDto memoRequestDto);

	// 메모 일괄 조회
	List<MemoResponseDto> getMemos(Long userId);

	// 메모 조회
	MemoResponseDto getMemo(Long userId, Integer memoId);
	
	// 메모 수정
	void modifyMemo(Long userId, Integer memoId, MemoRequestDto memoRequestDto);
	
	// 메모 삭제
	void deleteMemo(Long userId, Integer memoId);
}

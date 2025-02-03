package com.ssafy.docshund.domain.users.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;
import com.ssafy.docshund.domain.users.dto.profile.ProfileRequestDto;
import com.ssafy.docshund.domain.users.entity.User;

public interface UserQueryService {

	public Page<UserAndInfoDto> searchUsers(UserSearchCondition condition, Pageable pageable);

	public UserAndInfoDto getUserProfile(Long userId);

	public void modifyUserProfile(User user, ProfileRequestDto profileRequestDto);
}

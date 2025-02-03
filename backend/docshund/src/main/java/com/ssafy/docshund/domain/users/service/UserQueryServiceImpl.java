package com.ssafy.docshund.domain.users.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;
import com.ssafy.docshund.domain.users.dto.profile.ProfileRequestDto;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.entity.UserInfo;
import com.ssafy.docshund.domain.users.repository.UserInfoRepository;
import com.ssafy.docshund.domain.users.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserQueryServiceImpl implements UserQueryService {

	private final UserRepository userRepository;
	private final UserInfoRepository userInfoRepository;

	@Override
	@Transactional(readOnly = true)
	public Page<UserAndInfoDto> searchUsers(UserSearchCondition condition, Pageable pageable) {
		return userRepository.searchUsers(condition, pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public UserAndInfoDto getUserProfile(Long userId) {
		return userRepository.getProfileUser(userId);
	}

	@Override
	@Transactional
	public void modifyUserProfile(User user, ProfileRequestDto profileRequestDto) {
		UserInfo userInfo = userInfoRepository.findByUser(user).get();
		user.modifyUserProfile(profileRequestDto.getProfileUrl());
		userInfo.modifyInfo(profileRequestDto);
	}

}

package com.ssafy.docshund.domain.users.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserProfileDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;
import com.ssafy.docshund.domain.users.dto.profile.ProfileRequestDto;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.entity.UserInfo;
import com.ssafy.docshund.domain.users.repository.UserInfoRepository;
import com.ssafy.docshund.domain.users.repository.UserRepository;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserInfoRepository userInfoRepository;
	private final UserUtil userUtil;

	@Override
	@Transactional(readOnly = true)
	public Page<UserAndInfoDto> searchUsers(UserSearchCondition condition, Pageable pageable) {
		return userRepository.searchUsers(condition, pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public UserProfileDto getUserProfile(Long userId) {
		UserProfileDto profileUser = userRepository.getProfileUser(userId);
		if (profileUser == null) {
			return null;
		}

		User user = userUtil.getUser();
		if (user == null || !userUtil.isMine(userId, user)) {
			profileUser.setEmail(null);
			profileUser.setIsDarkmode(null);
		}

		return profileUser;
	}

	@Override
	@Transactional
	public void modifyUserProfile(User user, ProfileRequestDto profileRequestDto) {
		UserInfo userInfo = userInfoRepository.findByUser(user).get();
		user.modifyUserProfile(profileRequestDto.getProfileUrl(), profileRequestDto.getNickname());
		userInfo.modifyInfo(profileRequestDto);
	}

}

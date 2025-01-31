package com.ssafy.docshund.domain.users.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;

public interface UserQueryService {

	public Page<UserAndInfoDto> searchUsers(UserSearchCondition condition, Pageable pageable);
}

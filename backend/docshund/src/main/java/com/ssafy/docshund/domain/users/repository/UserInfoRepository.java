package com.ssafy.docshund.domain.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.docshund.domain.users.entity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}

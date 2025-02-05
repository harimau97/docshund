package com.ssafy.docshund.domain.alerts.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.docshund.domain.alerts.entity.Alert;
import com.ssafy.docshund.domain.users.entity.User;

public interface AlertRepository extends JpaRepository<Alert, Long> {

	// 유저별 알림 조회
	List<Alert> findByUserUserId(Long userId);

	// 알림 상세 조회
	Alert findByAlertId(Long alertId);
	
	// 유저별 알림 일괄 삭제
	void deleteAllByUser(User user);

	// 확인일 기준으로 30일이 지난 알림 삭제
	void deleteByCheckedAtBefore(LocalDateTime checkedAt);
}

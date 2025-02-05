package com.ssafy.docshund.domain.alerts.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.docshund.domain.alerts.dto.AlertOutputDto;
import com.ssafy.docshund.domain.users.entity.User;

@Service
public interface AlertsService {

	// 알림 목록 조회
	List<AlertOutputDto> getAllAlerts(Long userId);

	// 단일 알림 조회
	AlertOutputDto getAlert(Long alertId);

	// 알림 받아오기 SSE 연결
	SseEmitter subscribe(User user);

	// 알림 삭제
	void deleteAlert(Long alertId);

	// 알림 일괄 삭제
	void deleteAlerts();

	// 알림 읽음 처리
	void readAlert(Long alertId);

	// 알림 일괄 읽음 처리
	void readAlerts();
}

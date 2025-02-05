package com.ssafy.docshund.domain.alerts.service;

import com.ssafy.docshund.domain.alerts.dto.AlertInputDto;
import com.ssafy.docshund.domain.users.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class AlertsServiceImpl implements AlertsService {
    
    // 알림 전체 조회
    @Override
    public List<AlertInputDto> getAllAlerts(Long userId) {
        return List.of();
    }
    
    // 알림 받아오기 SSE 연결
    @Override
    public SseEmitter subscribe(User user) {
        return null;
    }
}

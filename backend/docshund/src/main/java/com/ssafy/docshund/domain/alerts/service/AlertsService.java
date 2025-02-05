package com.ssafy.docshund.domain.alerts.service;

import com.ssafy.docshund.domain.alerts.dto.AlertInputDto;
import com.ssafy.docshund.domain.users.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@Service
public interface AlertsService {
    List<AlertInputDto> getAllAlerts(Long userId);

    SseEmitter subscribe(User user);
}

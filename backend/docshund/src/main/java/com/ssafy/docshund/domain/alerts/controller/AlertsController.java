package com.ssafy.docshund.domain.alerts.controller;

import com.ssafy.docshund.domain.alerts.dto.AlertInputDto;
import com.ssafy.docshund.domain.alerts.service.AlertsService;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.util.user.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api/v1/docshund/alerts")
@RequiredArgsConstructor
public class AlertsController {

    private final AlertsService alertsService;
    private final UserUtil userUtil;

    // DB 스케줄링으로 하루에 한 번씩 30일이 지난 알림을 삭제 (전체 알림 DB 색인 후 삭제)

    // 알림 목록 조회
    @GetMapping("")
    public ResponseEntity<List<AlertInputDto>> getAlerts(
        @RequestParam(value = "userId") Long userId
    ) {
        List<AlertInputDto> alerts = alertsService.getAllAlerts(userId);
        return ResponseEntity.ok(alerts);
    }

    // 알림 상세 조회
    @GetMapping("{alertId}")
    public ResponseEntity<AlertInputDto> getAlert() {
        return null;
    }

    // 알림 삭제
    @DeleteMapping("{alertId}")
    public void deleteAlert() {
    }

    // 알림 조회 처리
    @PostMapping("{alertId}")
    public void readAlert() {
    }

    // 알림 받기 (SSE 연결)
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {
        User user = userUtil.getUser();
        return alertsService.subscribe(user);
    }

}

package com.ssafy.docshund.domain.alerts.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.docshund.domain.alerts.dto.AlertOutputDto;
import com.ssafy.docshund.domain.alerts.dto.Category;
import com.ssafy.docshund.domain.alerts.entity.Alert;
import com.ssafy.docshund.domain.alerts.repository.AlertRepository;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlertsServiceImpl implements AlertsService {

	private final AlertRepository alertRepository;

	private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
	private final UserUtil userUtil;

	// 알림 전체 조회
	@Override
	public List<AlertOutputDto> getAllAlerts(Long userId) {
		return List.of();
	}

	// 알림 단일 조회
	@Override
	public AlertOutputDto getAlert(Long alertId) {
		return null;
	}

	/*
	 ☆ SSE 연결 관련 로직 ☆
	 */
	@Override
	@Transactional
	public SseEmitter subscribe(User user) {
		Long userId = user.getUserId();
		SseEmitter emitter = new SseEmitter(60 * 1000L);

		emitters.put(userId, emitter);

		emitter.onCompletion(() -> emitters.remove(userId));
		emitter.onTimeout(() -> emitters.remove(userId));

		return emitter;
	}

	// 알림 생성 및 실시간 전송
	public void sendAlert(Alert alert) {
		alertRepository.save(alert);

		SseEmitter emitter = emitters.get(alert.getUser().getUserId());
		if (emitter != null) {
			try {
				AlertOutputDto outputDto = convertToOutputDto(alert);
				emitter.send(SseEmitter.event().name("alert").data(outputDto));
			} catch (IOException e) {
				emitters.remove(alert.getUser().getUserId());
			}
		}
	}

	// Alert -> AlertOutputDto 변환
	private AlertOutputDto convertToOutputDto(Alert alert) {
		Category category;
		Integer categoryId;
		String title;
		String content;

		if (alert.getTranslatedDocument() != null) {
			category = Category.TRANS;
			categoryId = alert.getTranslatedDocument().getTransId().intValue();
			String docTitle = alert.getTranslatedDocument()
				.getOriginDocument()
				.getDocument()
				.getDocumentName(); // 번역 문서 제목 추가
			String sentence = alert.getTranslatedDocument().getContent(); // 번역 문장 추가
			title = "🤎 번역 문서에 좋아요가 추가되었습니다!";
			content = "[ " + docTitle + " ] 문서에서 번역한 문장 '" + getShortContent(sentence) + "'이(가) 좋아요를 받았습니다!";
		} else if (alert.getArticle() != null) {
			category = Category.ARTICLE;
			categoryId = alert.getArticle().getArticleId();
			String articleTitle = alert.getArticle().getTitle(); // 게시글 제목 추가
			title = "💬 새로운 댓글이 달렸어요!";
			content = "게시글 [ " + articleTitle + " ]에 새로운 댓글이 달렸습니다!";
		} else if (alert.getComment() != null) {
			category = Category.COMMENT;
			categoryId = alert.getComment().getCommentId();
			String commentContent = alert.getComment().getContent(); // 댓글 내용 일부 가져오기
			title = "💬 댓글에 답글이 달렸어요!";
			content = "댓글 [ " + getShortContent(commentContent) + " ]에 새로운 대댓글이 달렸습니다!";
		} else if (alert.getInquiry() != null) {
			category = Category.INQUIRY;
			categoryId = alert.getInquiry().getInquiryId();
			String inquiryTitle = alert.getInquiry().getTitle();    // 문의 제목 추가
			title = "💌 문의에 대한 답변이 등록되었습니다!";
			content = "당신의 문의 [ " + inquiryTitle + " ]에 대한 답변이 등록되었습니다!";
		} else {
			throw new IllegalArgumentException("알 수 없는 카테고리입니다.");
		}

		return new AlertOutputDto(
			alert.getAlertId(),
			alert.getUser().getUserId(),
			category,
			categoryId,
			title,
			content,
			alert.getCreatedAt(),
			alert.getCheckedAt()
		);
	}

	// 내용이 너무 길면 일부만 가져오기 (20자까지만 표시)
	private String getShortContent(String content) {
		return (content.length() > 20) ? content.substring(0, 20) + "..." : content;
	}

	/*
	 ☆ SSE 연결 관련 로직 끝 ☆
	 */

	// 알림 삭제
	@Override
	@Transactional
	public void deleteAlert(Long alertId) {
		Alert alert = alertRepository.findById(alertId)
			.orElseThrow(() -> new IllegalArgumentException("알림을 찾을 수 없습니다."));
		if (!alert.getUser().getUserId().equals(userUtil.getUser().getUserId())) {
			throw new IllegalArgumentException("본인의 알림만 삭제할 수 있습니다.");
		}
		alertRepository.delete(alert);

	}

	// 알림 일괄 삭제
	@Override
	@Transactional
	public void deleteAlerts() {
		User user = userUtil.getUser();
		alertRepository.deleteAllByUser(user);
	}

	// 알림 읽음 처리
	@Override
	@Transactional
	public void readAlert(Long alertId) {
		Alert alert = alertRepository.findById(alertId)
			.orElseThrow(() -> new IllegalArgumentException("알림을 찾을 수 없습니다."));
		if (alert.getCheckedAt() != null) {
			throw new IllegalArgumentException("이미 읽은 알림입니다.");
		}
		if (!alert.getUser().getUserId().equals(userUtil.getUser().getUserId())) {
			throw new IllegalArgumentException("본인의 알림만 읽을 수 있습니다.");
		}
		alert.setCheckedAt(LocalDateTime.now()); // 읽은 시간을 현재로 지정 후 저장
		alertRepository.save(alert);
	}

	// 알림 일괄 읽음 처리
	@Override
	@Transactional
	public void readAlerts() {
		User user = userUtil.getUser();
		List<Alert> alerts = alertRepository.findByUserUserId(user.getUserId());
		for (Alert alert : alerts) {
			if (alert.getCheckedAt() == null) {
				alert.setCheckedAt(LocalDateTime.now());
				alertRepository.save(alert);
			}
		}
	}
}

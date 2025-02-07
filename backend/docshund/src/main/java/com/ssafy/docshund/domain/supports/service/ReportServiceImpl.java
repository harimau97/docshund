package com.ssafy.docshund.domain.supports.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.chats.entity.Chat;
import com.ssafy.docshund.domain.chats.repository.ChatRepository;
import com.ssafy.docshund.domain.docs.entity.TranslatedDocument;
import com.ssafy.docshund.domain.docs.repository.TranslatedDocumentRepository;
import com.ssafy.docshund.domain.forums.entity.Article;
import com.ssafy.docshund.domain.forums.entity.Comment;
import com.ssafy.docshund.domain.forums.repository.ArticleRepository;
import com.ssafy.docshund.domain.forums.repository.CommentRepository;
import com.ssafy.docshund.domain.supports.dto.report.ReportRequestDto;
import com.ssafy.docshund.domain.supports.entity.Report;
import com.ssafy.docshund.domain.supports.repository.ReportRepository;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.entity.UserInfo;
import com.ssafy.docshund.domain.users.repository.UserInfoRepository;
import com.ssafy.docshund.global.aws.s3.S3FileUploadService;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

	private final int INVISIBLE_REPORT_COUNT = 5;

	private final UserUtil userUtil;
	private final S3FileUploadService fileUploadService;
	private final ReportRepository reportRepositroy;
	private final UserInfoRepository userInfoRepository;
	private final CommentRepository commentRepository;
	private final ChatRepository chatRepository;
	private final TranslatedDocumentRepository translatedDocumentRepository;
	private final ArticleRepository articleRepository;

	@Override
	@Transactional(readOnly = true)
	public Page<Report> searchReportUsers(Long userId, Pageable pageable) {
		isAdminByReport();
		return reportRepositroy.searchReportUsers(userId, pageable);
	}

	@Override
	@Transactional
	//report로 requestPart로 받기
	public void reportUser(ReportRequestDto reportRequestDto, MultipartFile file) {
		User user = userUtil.getUser();
		if (user == null) {
			throw new SecurityException("조회할 수 있는 권한이 없습니다.");
		}
		String imageUrl = null;
		if (file != null) {
			imageUrl = fileUploadService.uploadFile(file, "inquiry");
		}

		Report report = Report.createReport(reportRequestDto, user, imageUrl);

		handleCommentReport(reportRequestDto, user, report);
		handleArticleReport(reportRequestDto, user, report);
		handleTranslatedDocumentReport(reportRequestDto, user, report);
		handleChatReport(reportRequestDto, user, report);

		UserInfo reportedUserInfo = userInfoRepository.findByUserAndUserInfo(reportRequestDto.getReportedUser())
			.orElseThrow(() -> new RuntimeException("신고할 대상을 찾을 수 없습니다."));

		reportedUserInfo.increaseReportCount();

		reportRepositroy.save(report);
	}

	private void handleCommentReport(ReportRequestDto reportRequestDto, User user, Report report) {
		if (reportRequestDto.getCommentId() != null) {
			if (reportRepositroy.existsByUserAndCommentId(user, reportRequestDto.getCommentId())) {
				throw new RuntimeException("이미 신고한 댓글입니다.");
			}
			Comment comment = commentRepository.findById(reportRequestDto.getCommentId())
				.orElseThrow(() -> new RuntimeException("신고할 대상을 찾을 수 없습니다."));
			comment.increaseReportCount();
			report.addCommentId(reportRequestDto.getCommentId());

			if (comment.getReportCount() >= INVISIBLE_REPORT_COUNT) {
				comment.modifyToInvisible();
			}
		}
	}

	private void handleArticleReport(ReportRequestDto reportRequestDto, User user, Report report) {
		if (reportRequestDto.getArticleId() != null) {
			if (reportRepositroy.existsByUserAndArticleId(user, reportRequestDto.getArticleId())) {
				throw new RuntimeException("이미 신고한 게시글입니다.");
			}
			Article article = articleRepository.findById(reportRequestDto.getArticleId())
				.orElseThrow(() -> new RuntimeException("신고할 대상을 찾을 수 없습니다."));
			article.increaseReportCount();
			report.addArticleId(reportRequestDto.getArticleId());

			if (article.getReportCount() >= INVISIBLE_REPORT_COUNT) {
				article.modifyToInvisible();
			}
		}
	}

	private void handleTranslatedDocumentReport(ReportRequestDto reportRequestDto, User user, Report report) {
		if (reportRequestDto.getTransId() != null) {
			if (reportRepositroy.existsByUserAndTransId(user, reportRequestDto.getTransId())) {
				throw new RuntimeException("이미 신고한 번역본입니다.");
			}
			TranslatedDocument translatedDocument = translatedDocumentRepository.findById(reportRequestDto.getTransId())
				.orElseThrow(() -> new RuntimeException("신고할 대상을 찾을 수 없습니다."));
			translatedDocument.increaseReportCount();
			report.addTrnasId(reportRequestDto.getTransId());

			if (translatedDocument.getReportCount() >= INVISIBLE_REPORT_COUNT) {
				translatedDocument.modifyToInvisible();
			}
		}
	}

	private void handleChatReport(ReportRequestDto reportRequestDto, User user, Report report) {
		if (reportRequestDto.getChatId() != null) {
			if (reportRepositroy.existsByUserAndChatId(user, reportRequestDto.getChatId())) {
				throw new RuntimeException("이미 신고한 채팅입니다.");
			}
			Chat chat = chatRepository.findById(reportRequestDto.getChatId())
				.orElseThrow(() -> new RuntimeException("신고할 대상을 찾을 수 없습니다."));
			chat.increaseReportCount();
			report.addChatId(reportRequestDto.getChatId());

			if (chat.getReportCount() >= INVISIBLE_REPORT_COUNT) {
				chat.modifyToInvisible();
			}
		}
	}

	private void isAdminByReport() {
		if (!userUtil.isAdmin(userUtil.getUser())) {
			throw new SecurityException("관리자가 아닙니다.");
		}
	}
}

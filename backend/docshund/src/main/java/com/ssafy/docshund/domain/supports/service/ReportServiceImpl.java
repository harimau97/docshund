package com.ssafy.docshund.domain.supports.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.chats.entity.Chat;
import com.ssafy.docshund.domain.chats.repository.ChatRepository;
import com.ssafy.docshund.domain.docs.entity.Status;
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

	@Override
	@Transactional
	public void withdrawReport(Integer reportId) {
		isAdminByReport();

		Report report = reportRepositroy.findById(reportId)
			.orElseThrow(() -> new RuntimeException("해당 신고를 찾을 수 없습니다."));
		UserInfo reportedUserInfo = userInfoRepository.findByUserAndUserInfo(report.getReportedUser())
			.orElseThrow(() -> new RuntimeException("신고할 대상을 찾을 수 없습니다."));

		handleWithdrawTranslatedDocumentReport(report, reportedUserInfo);
		handleWithdrawArticleReport(report, reportedUserInfo);
		handleWithdrawCommentReport(report, reportedUserInfo);
		handleWithdrawChatReport(report, reportedUserInfo);
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
				translatedDocument.modifyStatus(Status.INVISIBLE);
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

	private void handleWithdrawTranslatedDocumentReport(Report report, UserInfo reportedUserInfo) {
		if (report.getTransId() != null) {
			int reportCount = reportRepositroy.deleteAllByTransId((report.getTransId()));
			log.info("삭제된 신고 개수 = " + reportCount);
			TranslatedDocument translatedDocument = translatedDocumentRepository.findById(report.getTransId())
				.orElseThrow(() -> new RuntimeException("신고철회 할 대상을 찾을 수 없습니다."));
			translatedDocument.resetReportCount();
			reportedUserInfo.decreaseReportCount(reportCount);
		}
	}

	private void handleWithdrawArticleReport(Report report, UserInfo reportedUserInfo) {
		if (report.getArticleId() != null) {
			int reportCount = reportRepositroy.deleteAllByArticleId((report.getArticleId()));
			log.info("삭제된 신고 개수 = " + reportCount);
			Article article = articleRepository.findById(report.getArticleId())
				.orElseThrow(() -> new RuntimeException("신고철회 할 대상을 찾을 수 없습니다."));
			article.resetReportCount();
			reportedUserInfo.decreaseReportCount(reportCount);
		}
	}

	private void handleWithdrawCommentReport(Report report, UserInfo reportedUserInfo) {
		if (report.getCommentId() != null) {
			int reportCount = reportRepositroy.deleteAllByCommentId((report.getCommentId()));
			log.info("삭제된 신고 개수 = " + reportCount);
			Comment comment = commentRepository.findById(report.getCommentId())
				.orElseThrow(() -> new RuntimeException("신고철회 할 대상을 찾을 수 없습니다."));
			comment.resetReportCount();
			reportedUserInfo.decreaseReportCount(reportCount);
		}
	}

	private void handleWithdrawChatReport(Report report, UserInfo reportedUserInfo) {
		if (report.getChatId() != null) {
			int reportCount = reportRepositroy.deleteAllByChatId((report.getChatId()));
			log.info("삭제된 신고 개수 = " + reportCount);
			Chat chat = chatRepository.findById(report.getChatId())
				.orElseThrow(() -> new RuntimeException("신고철회 할 대상을 찾을 수 없습니다."));
			chat.resetReportCount();
			reportedUserInfo.decreaseReportCount(reportCount);
		}
	}

	private void isAdminByReport() {
		if (!userUtil.isAdmin(userUtil.getUser())) {
			throw new SecurityException("관리자가 아닙니다.");
		}
	}
}

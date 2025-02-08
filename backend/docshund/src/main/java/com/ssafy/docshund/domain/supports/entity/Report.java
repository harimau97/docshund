package com.ssafy.docshund.domain.supports.entity;

import com.ssafy.docshund.domain.supports.dto.report.ReportRequestDto;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.audit.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "report")
public class Report extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "report_id")
	private Integer reportId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User user;  // 신고한 유저 (user 테이블과 연결)

	@Enumerated(EnumType.STRING)
	@Column(name = "category", nullable = false)
	private ReportCategory category;  // 신고 카테고리 (Enum)

	@Column(name = "content", nullable = false)
	private String content;  // 신고 내용

	@Column(name = "origin_content", nullable = false)
	private String originContent;  // 신고된 내용 (번역, 게시글, 댓글 등)

	@Column(name = "reported_user", nullable = false)
	private Long reportedUser;  // 신고된 유저 (외래 키 아님)

	@Column(name = "report_file")
	private String reportFile;  // 신고 관련 파일

	@Column(name = "comment_id")
	private Integer commentId;

	@Column(name = "article_id")
	private Integer articleId;

	@Column(name = "trans_id")
	private Integer transId;

	@Column(name = "chat_id")
	private Long chatId;

	public static Report createReport(ReportRequestDto reportRequestDto, User user, String reportFile) {
		Report report = new Report();
		report.user = user;
		report.category = ReportCategory.fromDescription(reportRequestDto.getCategory());
		report.content = reportRequestDto.getContent();
		report.originContent = reportRequestDto.getOriginContent();
		report.reportedUser = reportRequestDto.getReportedUser();
		report.reportFile = reportFile;

		return report;
	}

	public void addCommentId(Integer commentId) {
		this.commentId = commentId;
	}

	public void addArticleId(Integer articleId) {
		this.articleId = articleId;
	}

	public void addTrnasId(Integer transId) {
		this.transId = transId;
	}

	public void addChatId(Long chatId) {
		this.chatId = chatId;
	}
}

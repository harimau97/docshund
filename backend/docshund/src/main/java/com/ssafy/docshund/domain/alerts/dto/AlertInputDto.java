package com.ssafy.docshund.domain.alerts.dto;

import com.ssafy.docshund.domain.alerts.entity.Alert;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// 알림 생성용
public record AlertInputDto(
    Integer alertId,
    String title,
    Long userId,
    Long transId,
    Integer articleId,
    Integer commentId,
    Integer inquiryId,
    LocalDateTime checkedAt
) {

    public static AlertInputDto fromEntity(Alert alert) {
        return new AlertInputDto(
            alert.getAlertId(),
            alert.getTitle(),
            alert.getUser().getUserId(),
            alert.getTranslatedDocument() != null ? alert.getTranslatedDocument().getTransId() : null,
            alert.getArticle() != null ? alert.getArticle().getArticleId() : null,
            alert.getComment() != null ? alert.getComment().getCommentId() : null,
            alert.getInquiry() != null ? alert.getInquiry().getInquiryId() : null,
            alert.getCheckedAt()
        );
    }
}

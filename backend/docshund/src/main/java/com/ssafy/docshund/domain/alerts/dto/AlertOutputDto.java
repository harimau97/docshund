package com.ssafy.docshund.domain.alerts.dto;

import java.time.LocalDateTime;

public record AlertOutputDto (
        Integer alertId,
        Long userId,
        Category category,
        Integer categoryId,
        String title,
        String content,
        LocalDateTime createdAt,
        LocalDateTime checkedAt
) {
    public static AlertOutputDto setOutputDto(Integer alertId, Long userId, Category category,
                                              Integer categoryId, String title, String content,
                                              LocalDateTime createdAt, LocalDateTime checkedAt) {
        return new AlertOutputDto(alertId, userId, category, categoryId, title, content,
                createdAt, checkedAt);
    }
}

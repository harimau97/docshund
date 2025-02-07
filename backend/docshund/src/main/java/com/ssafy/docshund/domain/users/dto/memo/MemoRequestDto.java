package com.ssafy.docshund.domain.users.dto.memo;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MemoRequestDto {
    private Integer memoId;
    private Long userId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @QueryProjection
    public MemoRequestDto(Integer memoId, Long userId, String title, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.memoId = memoId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

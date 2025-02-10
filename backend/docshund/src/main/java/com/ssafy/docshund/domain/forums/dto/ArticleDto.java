package com.ssafy.docshund.domain.forums.dto;

import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDto {
    @Null
    @Size(max = 50, message = "ARTICLE TITLE IS TOO LONG")
    private String title;

    @Null
    private String content;

    @Null
    private String category;
}

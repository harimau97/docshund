package com.ssafy.docshund.domain.chats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatDto {
    private Integer docsId;
    private String content;
}

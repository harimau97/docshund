package com.ssafy.docshund.domain.chats.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.docshund.domain.chats.entity.Chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatInfoDto {

    private Integer docsId;
    private Long chatId;
    private String content;
    private Long userId;
    private String nickName;
    private String profileImg;

    @QueryProjection
    public ChatInfoDto(Integer docsId, Long chatId, String content, Long userId, String nickName, String profileImg) {
        this.docsId = docsId;
        this.chatId = chatId;
        this.content = content;
        this.userId = userId;
        this.nickName = nickName;
        this.profileImg = profileImg;
    }

    public static ChatInfoDto from(Chat chat) {

        return new ChatInfoDto(
                chat.getDocument().getDocsId(),
                chat.getChatId(),
                chat.getContent(),
                chat.getUser().getUserId(),
                chat.getUser().getNickname(),
                chat.getUser().getProfileImage()
        );
    }
}

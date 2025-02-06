package com.ssafy.docshund.domain.chats.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.docshund.domain.chats.dto.ChatDto;
import com.ssafy.docshund.domain.chats.dto.ChatInfoDto;
import com.ssafy.docshund.domain.chats.entity.Chat;

public interface ChatService {

    Chat createChat(Integer docsId, ChatDto chatDto);

    Page<ChatInfoDto> getChatsByDocsId(Integer docsId, Pageable pageable);
}

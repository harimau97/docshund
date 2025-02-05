package com.ssafy.docshund.domain.chats.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.docshund.domain.chats.dto.ChatInfoDto;

public interface ChatService {

    Page<ChatInfoDto> getChats(Integer docsId, Pageable pageable);
}

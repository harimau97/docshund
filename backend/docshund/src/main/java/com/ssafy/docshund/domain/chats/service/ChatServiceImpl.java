package com.ssafy.docshund.domain.chats.service;

import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.docshund.domain.chats.dto.ChatDto;
import com.ssafy.docshund.domain.chats.dto.ChatInfoDto;
import com.ssafy.docshund.domain.chats.entity.Chat;
import com.ssafy.docshund.domain.chats.repository.ChatRepository;
import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.repository.DocumentRepository;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final UserUtil userUtil;
    private final DocumentRepository documentRepository;
    private final ChatRepository chatRepository;

    @Override
    @Transactional
    public Chat createChat(Integer docsId, ChatDto chatDto) {

        Document document = documentRepository.findByDocsId(docsId);
        if(document == null || document.getDocsId() != chatDto.getDocsId()) {
            throw new AccessDeniedException("NO EXISTS DOCUMENT & CHAT");
        }

        User user = userUtil.getUser();

        return chatRepository.save(new Chat(document, user, chatDto.getContent()));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ChatInfoDto> getChatsByDocsId(Integer docsId, Pageable pageable) {
        return chatRepository.findAllByDocsId(docsId, pageable);
    }
}

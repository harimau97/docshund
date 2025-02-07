package com.ssafy.docshund.domain.chats.controller;

import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ssafy.docshund.domain.chats.entity.Chat;
import com.ssafy.docshund.domain.chats.dto.ChatDto;
import com.ssafy.docshund.domain.chats.dto.ChatInfoDto;
import com.ssafy.docshund.domain.chats.service.ChatService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chats/{docsId}")
    @SendTo("/sub/chats/{docsId}")
    public ChatInfoDto sendChat(
            @DestinationVariable Integer docsId,
            @Payload ChatDto chatDto,
            Principal principal
    ) {

        long userId;

        if (principal == null) {
            log.error("WebSocket Error: Principal is NULL in ChatController!");
            throw new IllegalArgumentException("WEBSOCKET ERROR - Principal is null");
        }

        log.info("✅ Principal received in ChatController -> {}", principal.toString());

        try {
            if (principal instanceof UsernamePasswordAuthenticationToken authentication) {
                userId = (Long) authentication.getPrincipal(); // SecurityContext에서 가져온 userId 사용
            } else {
                log.error("WebSocket Error: Principal is not an instance of UsernamePasswordAuthenticationToken -> {}", principal);
                throw new IllegalArgumentException("WEBSOCKET ERROR - INVALID PRINCIPAL");
            }
        } catch (Exception e) {
            log.error("WebSocket Error: Invalid Principal - {}", principal, e);
            throw new IllegalArgumentException("WEBSOCKET ERROR - INVALID PRINCIPAL");
        }

        Chat savedChat = chatService.createChat(docsId, userId, chatDto);
        return ChatInfoDto.from(savedChat);
    }

    @GetMapping("/api/v1/docshund/chats/{docsId}")
    public ResponseEntity<Page<ChatInfoDto>> getChats(
            @PathVariable Integer docsId,
            @PageableDefault(page = 0, size = 50) Pageable pageable
    ) {
        Page<ChatInfoDto> result = chatService.getChatsByDocsId(docsId, pageable);

        return ResponseEntity.ok(result);
    }
}

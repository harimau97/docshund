package com.ssafy.docshund.global.util.stomp;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

import com.ssafy.docshund.global.util.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.CONNECT == accessor.getCommand()) {

            String authHeader = accessor.getFirstNativeHeader("Authorization");
            log.info("authHeader: {}", authHeader);

            if(jwtUtil.isValidAuthorization(authHeader)) {
                log.error("WEBSOCKET CONNECTION ERROR - JWT TOKEN IS INVALID");
                throw new IllegalArgumentException("WEBSOCKET CONNECTION ERROR - JWT TOKEN IS INVALID");
            }

            String token = authHeader.replace("Bearer ", "");
            if(jwtUtil.isExpired(token)) {
                log.error("WEBSOCKET CONNECTION ERROR - JWT TOKEN IS EXPIRED");
                throw new IllegalArgumentException("WEBSOCKET CONNECTION ERROR - JWT TOKEN IS EXPIRED");
            }

            Long userId = jwtUtil.getUserlId(token);

            accessor.setUser(new StompPrincipal(userId.toString()));
            if (accessor.getUser() == null) {
                log.error("StompHandler: Principal is NOT set!");
            } else {
                log.info("StompHandler: Principal set successfully -> {}", accessor.getUser().getName());
            }

        }
        return MessageBuilder
                .withPayload(message.getPayload())
                .copyHeaders(accessor.getMessageHeaders())
                .build();
    }
}

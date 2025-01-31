package com.ssafy.docshund.global.util.user;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.docshund.domain.users.dto.auth.CustomOAuth2User;
import com.ssafy.docshund.domain.users.entity.Status;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.repository.UserRepository;
import com.ssafy.docshund.global.util.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserUtil {

	private final JwtUtil jwtUtil;
	private final UserRepository userRepository;

	@Transactional(readOnly = true)
	public User getUser() {
		CustomOAuth2User principal = (CustomOAuth2User)SecurityContextHolder.getContext()
			.getAuthentication()
			.getPrincipal();

		String personalId = principal.getPersonalId();
		log.info("Personal ID: {}", personalId);

		User user = userRepository.findByPersonalId(personalId)
			.orElseThrow(() -> {
				log.error("User not found");
				return new ResponseStatusException(HttpStatus.NOT_FOUND, "회원 정보를 찾을 수 없습니다.");
			});

		log.info("email: {}", user.getEmail());

		return user;
	}

	@Transactional(readOnly = true)
	public boolean isActiveUser(User user) {
		if (user.getStatus() == Status.ACTIVE) {
			return true;
		}

		log.error("User is not active");
		return false;
	}

}

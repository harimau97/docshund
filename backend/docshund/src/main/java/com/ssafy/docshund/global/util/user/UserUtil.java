package com.ssafy.docshund.global.util.user;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ssafy.docshund.domain.users.dto.auth.CustomOAuth2User;
import com.ssafy.docshund.domain.users.entity.Role;
import com.ssafy.docshund.domain.users.entity.Status;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserUtil {

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

	@Transactional(readOnly = true)
	public boolean isAdmin(User user) {
		if (user.getRole() != Role.ROLE_ADMIN) {
			log.info("is Not Admin");
			return false;
		}

		log.info("is Admin");
		return true;
	}

	@Transactional(readOnly = true)
	public boolean isMine(Long userId, User user) {
		if (!user.getUserId().equals(userId)) {
			log.info("is Not Mine");
			return false;
		}

		log.info("is Mine");
		return true;
	}

}

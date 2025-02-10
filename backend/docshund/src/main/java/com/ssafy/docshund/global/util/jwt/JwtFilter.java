package com.ssafy.docshund.global.util.jwt;

import static com.ssafy.docshund.domain.users.exception.auth.AuthExceptionCode.EXPIRED_TOKEN;
import static com.ssafy.docshund.domain.users.exception.auth.AuthExceptionCode.INVALID_TOKEN;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.docshund.domain.users.dto.auth.CustomOAuth2User;
import com.ssafy.docshund.domain.users.dto.auth.UserDto;
import com.ssafy.docshund.domain.users.exception.auth.AuthException;
import com.ssafy.docshund.domain.users.repository.UserRepository;
import com.ssafy.docshund.global.exception.ExceptionResponse;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final UserRepository userRepository;
	private final AntPathMatcher pathMatcher = new AntPathMatcher();

	private static final List<String> NO_CHECK_URLS = Arrays.asList("/ws/**");

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String path = request.getRequestURI();

		// 체크할 필요 없는 URL이면 다음 필터로 이동
		if (NO_CHECK_URLS.stream().anyMatch(pattern -> pathMatcher.match(pattern, path))) {
			filterChain.doFilter(request, response);
			return;
		}

		String authorizationHeader = request.getHeader("Authorization");

		try {
			if (!jwtUtil.isValidAuthorization(authorizationHeader)) {
				throw new AuthException(INVALID_TOKEN);
			}

			String token = authorizationHeader.substring(7);

			if (jwtUtil.isExpired(token)) {
				throw new AuthException(EXPIRED_TOKEN);
			}

			String personalId = jwtUtil.getPersonalId(token);
			String role = jwtUtil.getRole(token);
			Long userId = jwtUtil.getUserId(token);

			UserDto userDto = new UserDto(userId, personalId, role);
			CustomOAuth2User customOAuth2User = new CustomOAuth2User(userDto);

			Authentication authToken = new UsernamePasswordAuthenticationToken(
				customOAuth2User, null, customOAuth2User.getAuthorities()
			);

			SecurityContextHolder.getContext().setAuthentication(authToken);
			filterChain.doFilter(request, response);

		} catch (AuthException e) {
			handleAuthException(response, e);
		}
	}

	private void handleAuthException(HttpServletResponse response, AuthException e) throws IOException {
		log.error("AuthException 발생: {}", e.getMessage());

		response.setStatus(e.getExceptionCode().getHttpStatus().value());
		response.setContentType("application/json;charset=UTF-8");

		ExceptionResponse exceptionResponse = new ExceptionResponse(e.getExceptionCode());
		response.getWriter().write(new ObjectMapper().writeValueAsString(exceptionResponse));
	}
}


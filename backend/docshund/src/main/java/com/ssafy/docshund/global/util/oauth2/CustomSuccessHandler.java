package com.ssafy.docshund.global.util.oauth2;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.ssafy.docshund.domain.users.dto.auth.CustomOAuth2User;
import com.ssafy.docshund.global.util.jwt.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtUtil jwtUtil;
	private static final long TOKEN_EXPIRATION = 60L * 60L * 24L * 30L;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		CustomOAuth2User userDetails = (CustomOAuth2User)authentication.getPrincipal();

		String personalId = userDetails.getPersonalId();

		String role = authentication.getAuthorities().stream()
			.findFirst()
			.map(GrantedAuthority::getAuthority)
			.orElse("ROLE_USER");

		String token = jwtUtil.createJwt(personalId, role, TOKEN_EXPIRATION);
		log.info("Token: " + token);

		response.addHeader("Authorization", "Bearer " + token);
		response.sendRedirect("http://localhost:8080/api/v1/docshund/users/login");
	}

}

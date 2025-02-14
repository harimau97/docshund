package com.ssafy.docshund.global.util.oauth2;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception) throws IOException, ServletException {

		String message = exception.getMessage();
		String redirectUrl;

		log.info("exception {}", exception.toString());
		log.info("message {}", message);

		if (message.startsWith("USER_BANNED")) {
			redirectUrl = "https://i12a703.p.ssafy.io/error?status=403&message=" + URLEncoder.encode("계정이 정지되었습니다.",
				StandardCharsets.UTF_8);
		} else if (message.startsWith("USER_WITHDRAW")) {
			redirectUrl = "https://i12a703.p.ssafy.io/error?status=410&message=" + URLEncoder.encode("탈퇴한 계정입니다.",
				StandardCharsets.UTF_8);
		} else {
			redirectUrl = "https://i12a703.p.ssafy.io/";
		}

		getRedirectStrategy().sendRedirect(request, response, redirectUrl);
	}
}


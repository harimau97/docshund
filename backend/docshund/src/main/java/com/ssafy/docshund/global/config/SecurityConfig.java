package com.ssafy.docshund.global.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.ssafy.docshund.domain.users.repository.UserRepository;
import com.ssafy.docshund.domain.users.service.UserAuthServiceImpl;
import com.ssafy.docshund.global.util.jwt.JwtUtil;
import com.ssafy.docshund.global.util.oauth2.CustomSuccessHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final CustomSuccessHandler customSuccessHandler;
	private final UserAuthServiceImpl userAuthServiceImpl;
	private final JwtUtil jwtUtil;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, UserRepository userRepository) throws Exception {
		http
			.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		http.csrf((auth) -> auth.disable());
		http.formLogin((auth) -> auth.disable());
		http.httpBasic((auth) -> auth.disable());
		//		 http.addFilterBefore(new JwtFilter(jwtUtil, userRepository), UsernamePasswordAuthenticationFilter.class);
		//		 http.oauth2Login((oauth2) -> oauth2
		//		 	.userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
		//		 		.userService(userAuthServiceImpl))
		//		 	.successHandler(customSuccessHandler));
		http.authorizeHttpRequests((auth) -> auth
			.anyRequest().permitAll());
		http.sessionManagement((session) -> session
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		return request -> {
			CorsConfiguration configuration = new CorsConfiguration();
			configuration.setAllowedOrigins(Collections.singletonList("http://localhost:5173")); // Origin 허용
			configuration.setAllowedMethods(Collections.singletonList("*")); // 모든 HTTP 메서드 허용
			configuration.setAllowedHeaders(Collections.singletonList("*")); // 모든 헤더 허용
			configuration.setAllowCredentials(true); // 인증 정보 포함 허용
			configuration.setMaxAge(3600L); // Pre-flight 요청 캐시 시간

			return configuration;
		};
	}
}

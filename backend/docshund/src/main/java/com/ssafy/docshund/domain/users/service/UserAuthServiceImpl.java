package com.ssafy.docshund.domain.users.service;

import static com.ssafy.docshund.domain.users.entity.Provider.GITHUB;
import static com.ssafy.docshund.domain.users.entity.Provider.GOOGLE;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.docshund.domain.users.dto.auth.CustomOAuth2User;
import com.ssafy.docshund.domain.users.dto.auth.GithubResponse;
import com.ssafy.docshund.domain.users.dto.auth.GoogleResponse;
import com.ssafy.docshund.domain.users.dto.auth.OAuth2Response;
import com.ssafy.docshund.domain.users.dto.auth.UserDto;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.repository.UserRepository;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserAuthServiceImpl extends DefaultOAuth2UserService {

	private final UserRepository userRepository;
	private final UserUtil userUtil;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		OAuth2Response oAuth2Response = getOAuth2Response(registrationId, oAuth2User);

		String username = generateUsername(oAuth2Response);
		UserDto userDto = UserDto.createUserDto(oAuth2Response, username);

		userRepository.findByProviderAndPersonalId(oAuth2Response.getProvider(), oAuth2Response.getProviderId())
			.orElseGet(() -> userRepository.save(User.createUser(userDto)));

		return new CustomOAuth2User(userDto);
	}

	public void deleteUser() {
		User user = userUtil.getUser();
		user.deleteUser();
	}

	private OAuth2Response getOAuth2Response(String registrationId, OAuth2User oAuth2User) {
		if (registrationId.equals(GITHUB.getLoginProvider())) {
			log.info("Google Register ProviderID: {}", oAuth2User.getAttributes().get("id"));
			return new GithubResponse(oAuth2User.getAttributes());
		}
		if (registrationId.equals(GOOGLE.getLoginProvider())) {
			log.info("Google Register ProviderID: {}", oAuth2User.getAttributes().get("sub"));
			return new GoogleResponse(oAuth2User.getAttributes());
		}
		throw new IllegalArgumentException("Unsupported OAuth Provider: " + registrationId);
	}

	private String generateUsername(OAuth2Response oAuth2Response) {
		String prefix = oAuth2Response.getProvider().equals(GITHUB) ? "gh" : "gg";
		String reversedId = new StringBuilder(oAuth2Response.getProviderId()).reverse().toString();
		return prefix + "_" + reversedId.substring(0, Math.min(reversedId.length(), 6));
	}
}

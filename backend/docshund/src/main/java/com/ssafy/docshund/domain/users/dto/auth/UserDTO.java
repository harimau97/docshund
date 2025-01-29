package com.ssafy.docshund.domain.users.dto.auth;

import com.ssafy.docshund.domain.users.entity.Provider;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {

	private Provider provider;
	private String personalId;
	private String email;
	private String nickname;
	private String role;

	public static UserDTO createUserDto(OAuth2Response oAuth2Response, String username) {
		return UserDTO.builder()
			.provider(oAuth2Response.getProvider())
			.personalId(oAuth2Response.getProviderId())
			.email(oAuth2Response.getEmail())
			.nickname(username)
			.role("ROLE_USER")
			.build();
	}
}

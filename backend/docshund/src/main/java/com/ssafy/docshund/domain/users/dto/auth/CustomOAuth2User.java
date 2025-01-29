package com.ssafy.docshund.domain.users.dto.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {
	private final UserDTO userDTO;

	@Override
	public Map<String, Object> getAttributes() {

		return Map.of();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		Collection<GrantedAuthority> collection = new ArrayList<>();

		collection.add(new GrantedAuthority() {

			@Override
			public String getAuthority() {

				return userDTO.getRole();
			}
		});

		return collection;
	}

	@Override
	public String getName() {

		return userDTO.getEmail();
	}

	public String getUsername() {

		return userDTO.getNickname();
	}
}

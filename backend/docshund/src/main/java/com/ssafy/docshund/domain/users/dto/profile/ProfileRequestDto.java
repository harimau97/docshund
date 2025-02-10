package com.ssafy.docshund.domain.users.dto.profile;

import com.ssafy.docshund.domain.users.entity.Hobby;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRequestDto {
	@Size(max = 10, message = "10자를 넘을 수 없습니다.")
	@Pattern(regexp = "^(?!멍멍이$).*", message = "사용할 수 없는 닉네임입니다.")
	private String nickname;

	@Size(max = 80, message = "자기소개 글자는 80자를 넘을 수 없습니다.")
	private String introduce;

	@NotNull(message = "필수 값 입니다.")
	private Boolean isDarkmode;

	private String hobby;

	public Hobby getHobbyEnum() {
		return hobby != null ? Hobby.fromString(hobby) : null;
	}
}

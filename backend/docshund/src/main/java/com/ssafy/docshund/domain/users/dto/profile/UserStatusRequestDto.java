package com.ssafy.docshund.domain.users.dto.profile;

import com.ssafy.docshund.domain.users.entity.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserStatusRequestDto {

	private Status status;
}

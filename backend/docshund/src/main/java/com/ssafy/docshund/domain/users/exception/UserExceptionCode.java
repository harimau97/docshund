package com.ssafy.docshund.domain.users.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import org.springframework.http.HttpStatus;

import com.ssafy.docshund.global.exception.ExceptionCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserExceptionCode implements ExceptionCode {

	MEMBER_NOT_FOUND(NOT_FOUND, "M-C-001", "회원을 찾을 수 없습니다."),
	MEMBER_DUPLICATE_ERROR(BAD_REQUEST, "M-C-002", "중복된 닉네임입니다.");

	private final HttpStatus httpStatus;
	private final String code;
	private final String message;
}

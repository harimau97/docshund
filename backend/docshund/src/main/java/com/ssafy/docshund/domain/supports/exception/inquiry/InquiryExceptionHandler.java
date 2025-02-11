package com.ssafy.docshund.domain.supports.exception.inquiry;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ssafy.docshund.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class InquiryExceptionHandler {

	@ExceptionHandler(InquiryException.class)
	public ResponseEntity inquiryException(
		InquiryException exception
	) {
		log.error("{}", exception.getMessage());

		return new ResponseEntity<>(
			new ExceptionResponse(exception.getExceptionCode()),
			exception.getExceptionCode().getHttpStatus()
		);
	}
}

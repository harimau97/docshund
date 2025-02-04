package com.ssafy.docshund.domain.supports.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.supports.dto.inquiry.InquiryRequestDto;
import com.ssafy.docshund.domain.supports.service.InquiryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/docshund/supports/inquiry")
public class InquiryController {

	private final InquiryService inquiryServiceImpl;

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createInquiry(
		@RequestPart("inquiry") InquiryRequestDto inquiryRequestDto,
		@RequestPart(value = "file", required = false) MultipartFile file) {

		inquiryServiceImpl.createInquiry(inquiryRequestDto, file);

		return ResponseEntity.ok("문의 작성이 완료되었습니다.");
	}
}

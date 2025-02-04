package com.ssafy.docshund.domain.supports.service;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.supports.dto.inquiry.InquiryRequestDto;

public interface InquiryService {

	void createInquiry(InquiryRequestDto inquiryRequestDto, MultipartFile file);

	void getInquiries();

	void respondToInquiry();
}

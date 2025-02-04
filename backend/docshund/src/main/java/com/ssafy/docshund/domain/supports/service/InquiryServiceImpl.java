package com.ssafy.docshund.domain.supports.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.supports.dto.inquiry.InquiryRequestDto;
import com.ssafy.docshund.domain.supports.entity.Inquiry;
import com.ssafy.docshund.domain.supports.repository.InquiryRepository;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.aws.s3.S3FileUploadService;
import com.ssafy.docshund.global.mail.MailSendService;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService {

	private final InquiryRepository inquiryRepository;
	private final MailSendService mailSendService;
	private final S3FileUploadService fileUploadService;
	private final UserUtil userUtil;

	@Override
	@Transactional
	public void createInquiry(InquiryRequestDto inquiryRequestDto, MultipartFile file) {
		User user = userUtil.getUser();
		String imageUrl = null;
		if (file != null)
			imageUrl = fileUploadService.uploadFile(file, "inquiry");

		Inquiry inquiry = Inquiry.createInquiry(user, inquiryRequestDto, imageUrl);
		inquiryRepository.save(inquiry);

		inquiryRequestDto.emailTextGenerator(imageUrl);
		mailSendService.sendEmail(inquiryRequestDto.getEmail(), inquiryRequestDto.getTitle(),
			inquiryRequestDto.getContent());

	}

	@Override
	public void getInquiries() {

	}

	@Override
	public void respondToInquiry() {

	}

}

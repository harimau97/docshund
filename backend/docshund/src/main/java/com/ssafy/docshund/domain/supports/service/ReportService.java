package com.ssafy.docshund.domain.supports.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.supports.dto.report.ReportRequestDto;
import com.ssafy.docshund.domain.supports.entity.Report;

public interface ReportService {

	public Page<Report> searchReportUsers(Long userId, Pageable pageable);

	public void reportUser(ReportRequestDto reportRequestDto, MultipartFile file);

	public void withdrawReport(Integer reportId);
}

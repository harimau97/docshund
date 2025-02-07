package com.ssafy.docshund.domain.supports.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.docshund.domain.supports.entity.Report;

public interface ReportRepositoryCustom {

	Page<Report> searchReportUsers(Long userId, Pageable pageable);
}

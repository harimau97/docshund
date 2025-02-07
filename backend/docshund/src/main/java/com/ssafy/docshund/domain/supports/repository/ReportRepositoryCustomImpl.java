package com.ssafy.docshund.domain.supports.repository;

import static com.ssafy.docshund.domain.supports.entity.QReport.report;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.docshund.domain.supports.entity.Report;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReportRepositoryCustomImpl implements ReportRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public Page<Report> searchReportUsers(Long userId, Pageable pageable) {
		BooleanBuilder builder = new BooleanBuilder();

		if (userId != null) {
			builder.and(report.reportedUser.eq(userId));
		}

		List<Report> results = queryFactory
			.selectFrom(report)
			.where(builder)
			.orderBy(report.createdAt.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		long total = Optional.ofNullable(queryFactory
				.select(report.count())
				.from(report)
				.where(builder)
				.fetchOne())
			.orElse(0L);

		return new PageImpl<>(results, pageable, total);
	}

}

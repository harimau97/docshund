package com.ssafy.docshund.domain.supports.entity;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReportCategory {
	ABUSIVE_LANGUAGE_OR_VIOLENCE("욕설 및 폭력성"),
	EXPLICIT_OR_ILLEGAL_CONTENT("음란물 및 불법 콘텐츠 게시"),
	PROMOTING_GAMBLING("사행성 조장"),
	SPAM_OR_ADVERTISING("스팸 및 광고"),
	FLOODING("도배"),
	PERSONAL_INFORMATION_EXPOSURE("개인정보 노출"),
	COPYRIGHT_INFRINGEMENT("저작권 침해"),
	OTHER("기타");

	private final String description;

	// description을 기반으로 ReportCategory 찾기
	public static ReportCategory fromDescription(String description) {
		return Arrays.stream(ReportCategory.values())
			.filter(category -> category.getDescription().equals(description))
			.findFirst()
			.orElseThrow(() -> new IllegalArgumentException("해당하는 신고 카테고리가 없습니다: " + description));
	}
}

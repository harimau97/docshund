package com.ssafy.docshund.domain.supports.dto.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportRequestDto {

	private Integer commentId;
	private Integer articleId;
	private Integer transId;
	private Long chatId;
	private String category;
	private String content;
	private String originContent;
	private Long reportedUser;
}

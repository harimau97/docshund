package com.ssafy.docshund.domain.supports.dto.inquiry;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InquiryRequestDto {

	private String email;
	private String title;
	private String category;
	private String content;

	public void emailTextGenerator(String fileUrl) {
		this.title = title + " 문의 내용 전송 드립니다.";
		this.content = "<h1>문의 종류 : " + this.category + "</h1>\n"
			+ content
			+ "\n <b>빠른 시일 내에 답변해드리겠습니다.</b>";

		if (fileUrl != null) {
			this.content += "<br><b>첨부 파일:</b><br>"
				+ "<img src='" + fileUrl + "' alt='첨부 이미지' style='max-width: 800px; height: auto;'/>";
		}
	}

}

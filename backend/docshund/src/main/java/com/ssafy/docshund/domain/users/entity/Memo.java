package com.ssafy.docshund.domain.users.entity;

import com.ssafy.docshund.global.audit.BaseTimeEntityWithUpdatedAt;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "memo")
@Getter
@NoArgsConstructor
public class Memo extends BaseTimeEntityWithUpdatedAt {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "memo_id")
	private Integer memoId;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "title", nullable = false, length = 100)
	private String title;

	@Column(name = "content", nullable = false, columnDefinition = "TEXT")
	private String content;

	public Memo(User user, String title, String content) {
		this.user = user;
		this.title = title;
		this.content = content;
	}

	public void modifyMemo(String title, String content) {
		this.title = title;
		this.content = content;
	}
}

package com.ssafy.docshund.domain.docs.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.OriginDocumentDto;
import com.ssafy.docshund.domain.docs.dto.TranslatedDocumentDto;
import com.ssafy.docshund.domain.docs.service.DocsService;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/docshund/docs")
@RequiredArgsConstructor
public class DocsController {

	private final DocsService docsService;
	private final UserUtil userUtil;

	// 문서 목록 조회
	@GetMapping("")
	public ResponseEntity<List<DocumentDto>> getDocs(
		@RequestParam(value = "sort", defaultValue = "name") String sort, // 기본 정렬: name
		@RequestParam(value = "order", defaultValue = "asc") String order // 기본 정렬 순서: asc
	) {
		List<DocumentDto> documents = docsService.getAllDocuments(sort, order);

		return ResponseEntity.ok(documents);
	}

	// 문서 정보(Document) 등록
	@PostMapping("")
	public ResponseEntity<DocumentDto> postDocs(@RequestBody DocumentDto documentDto) {
		User user = userUtil.getUser();
		DocumentDto createdDocument = docsService.createDocument(documentDto, user);
		return ResponseEntity.ok(createdDocument);
	}

	// 문서 정보 상세 조회
	@GetMapping("/{docsId}")
	public ResponseEntity<DocumentDto> getDocsDetail(@PathVariable Integer docsId) {
		DocumentDto document = docsService.getDocumentDetail(docsId);
		return ResponseEntity.ok(document);
	}

	// 관심 문서 등록 및 해제
	@PostMapping("/{docsId}/likes")
	public ResponseEntity<DocumentDto> toggleLikes(@PathVariable Integer docsId) {
		User user = userUtil.getUser();
		DocumentDto document = docsService.toggleLikes(docsId, user);
		return ResponseEntity.ok(document);
	}

	// 유저 관심 문서 조회 (현재 특정 유저 관심문서 조회만 구현)
	@GetMapping("/likes")
	public ResponseEntity<List<DocumentDto>> getLikes(
		@RequestParam(required = false) Long userId
	) {
		if (userId == null) {
			throw new IllegalArgumentException("User not found");
		}
		List<DocumentDto> documents = docsService.getLikesDocument(userId);
		return ResponseEntity.ok(documents);
	}

	// 받은 원본 문서를 파싱하여 원본 생성
	@PostMapping("/{docsId}/origin")
	public ResponseEntity<List<OriginDocumentDto>> postOriginDocs(
		@PathVariable Integer docsId,
		@RequestParam String content
	) {
		User user = userUtil.getUser();
		List<OriginDocumentDto> createdDocs = docsService.createOriginDocuments(docsId, content, user);
		return ResponseEntity.ok(createdDocs);
	}

	// 원본 문서(OriginDocument) 조회 (전체 조회 / 단락별 조회)
	@GetMapping("/{docsId}/origin")
	public ResponseEntity<?> getOriginDocs(
		@PathVariable Integer docsId,
		@RequestParam(required = false) Integer originId
	) {
		if (originId == null) {
			// 전체 원본 조회 (QueryParam이 없을 경우)
			List<OriginDocumentDto> originDocuments = docsService.getAllOriginDocuments(docsId);
			return ResponseEntity.ok(originDocuments);
		} else {
			// 특정 단락 원본 조회 (QueryParam 존재 시)
			OriginDocumentDto originDocument = docsService.getOriginDocumentDetail(originId);
			return ResponseEntity.ok(originDocument);
		}
	}

	// 특정 문서의 번역 조회하기 (전체, 베스트 번역)
	@GetMapping("/{docsId}/trans")
	public ResponseEntity<?> getTransDocs(
		@PathVariable Integer docsId,
		@RequestParam String status
	) {
		List<TranslatedDocumentDto> translatedDocuments;

		if (status == null || !status.equalsIgnoreCase("best")) {
			// 전체 번역 조회
			translatedDocuments = docsService.getAllTranslatedDocuments(docsId);
		} else {
			// 베스트 번역 조회
			translatedDocuments = docsService.getBestTranslatedDocuments(docsId);
		}

		return ResponseEntity.ok().body(translatedDocuments);
	}

	// 특정 문단의 번역 조회하기
	@GetMapping("{docsId}/trans/{originId}")
	public ResponseEntity<?> getTransDocs(
		@PathVariable Integer docsId,
		@PathVariable Integer originId,
		@RequestParam(defaultValue = "like") String sort,
		@RequestParam(defaultValue = "desc") String order
	) {
		List<TranslatedDocumentDto> translatedDocuments = docsService.getTranslatedDocuments(docsId, originId, sort,
			order);

		return ResponseEntity.ok(translatedDocuments);
	}

	// 번역 조회하기 (현재 특정 유저 번역만 조회하게 구현)
	@GetMapping("/trans")
	public ResponseEntity<?> getTransDocs(
		@RequestParam(required = false) Long userId
	) {
		List<TranslatedDocumentDto> translatedDocuments;

		if (userId == null) {
			// 유저 아이디가 없을 시 에러 반환
			throw new IllegalArgumentException("User not found");
		} else {
			// 해당 유저의 번역본 조희
			translatedDocuments = docsService.getUserTransDocument(userId);
		}

		return ResponseEntity.ok().body(translatedDocuments);
	}

	// 번역 작성하기
	@PostMapping("/{docsId}/trans/{originId}")
	public ResponseEntity<?> postTransDocs(
		@PathVariable Integer docsId,
		@PathVariable Integer originId,
		@RequestBody Map<String, String> requestBody
	) {
		User user = userUtil.getUser();
		if (user == null) {
			throw new IllegalArgumentException("User not found");
		}

		String content = requestBody.get("content");
		if (content == null || content.trim().isEmpty()) {
			return ResponseEntity.badRequest().body("Content cannot be empty.");
		}

		TranslatedDocumentDto createdTrans = docsService.createTranslatedDocument(docsId, originId, user, content);
		return ResponseEntity.ok().body(Map.of("message", "Translation created successfully.", "data", createdTrans));
	}

	// 번역 상세보기
	@GetMapping("/{docsId}/trans/paragraph/{transId}")
	public ResponseEntity<?> getTransDetail(
		@PathVariable Integer docsId,
		@PathVariable Integer transId
	) {
		TranslatedDocumentDto transDocument = docsService.getTranslatedDocumentDetail(docsId, transId);
		return ResponseEntity.ok(transDocument);
	}

	// 번역 수정하기
	@PatchMapping("/{docsId}/trans/paragraph/{transId}")
	public ResponseEntity<?> patchTrans(
		@PathVariable Integer docsId,
		@PathVariable Integer transId,
		@RequestBody Map<String, String> requestBody
	) {
		User user = userUtil.getUser();
		if (user == null) {
			throw new IllegalArgumentException("User not found");
		}

		String content = requestBody.get("content");
		if (content == null || content.trim().isEmpty()) {
			return ResponseEntity.badRequest().body("Edited content cannot be empty.");
		}

		TranslatedDocumentDto editedTrans = docsService.updateTranslatedDocument(docsId, transId, user, content);
		return ResponseEntity.ok().body(Map.of("message", "Translation updated successfully.", "data", editedTrans));
	}

	// 번역 삭제하기
	@DeleteMapping("/{docsId}/trans/paragraph/{transId}")
	public ResponseEntity<?> deleteTrans(
		@PathVariable Integer docsId,
		@PathVariable Integer transId
	) {
		User user = userUtil.getUser();
		if (user == null) {
			throw new IllegalArgumentException("User not found");
		}

		docsService.deleteTranslatedDocument(docsId, transId, user);
		return ResponseEntity.ok().body(Map.of("message", "Translation deleted successfully."));
	}

	// 번역 투표 / 투표 해제 하기
	@PostMapping("/{docsId}/trans/paragraph/{transId}/votes")
	public ResponseEntity<?> postTransVotes(
		@PathVariable Integer docsId,
		@PathVariable Integer transId
	) {
		User user = userUtil.getUser();
		if (user == null) {
			throw new IllegalArgumentException("User not found");
		}

		boolean isLiked = docsService.toggleVotes(docsId, transId, user);
		return ResponseEntity.ok().body(Map.of(
			"message", isLiked ? "Translation liked successfully." : "Translation unliked successfully.",
			"liked", isLiked
		));
	}

	// 특정 유저가 좋아한 번역 목록 조회
	@GetMapping("/trans/votes")
	public ResponseEntity<?> getTransVotes(
		@RequestParam Long userId
	) {
		List<TranslatedDocumentDto> likedTrans;

		if (userId == null) {
			// 유저 아이디가 없을 시 에러 반환
			throw new IllegalArgumentException("User not found");
		} else {
			// 해당 유저가 좋아한 번역본 목록 조회
			likedTrans = docsService.getUserLikedTrans(userId);
		}

		return ResponseEntity.ok().body(likedTrans);
	}
}

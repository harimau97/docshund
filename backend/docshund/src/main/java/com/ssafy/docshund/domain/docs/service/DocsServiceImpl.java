package com.ssafy.docshund.domain.docs.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ssafy.docshund.domain.docs.entity.*;
import com.ssafy.docshund.domain.docs.repository.*;
import com.ssafy.docshund.global.util.user.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.OriginDocumentDto;
import com.ssafy.docshund.domain.docs.dto.TranslatedDocumentDto;
import com.ssafy.docshund.domain.users.entity.User;

import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DocsServiceImpl implements DocsService {

	private final DocumentRepository documentRepository;
	private final DocumentLikeRepository documentLikeRepository;
	private final OriginDocumentRepository originDocumentRepository;
	private final CustomDocumentRepository customDocumentRepository;
	private final TranslatedDocumentRepository translatedDocumentRepository;
	private final TranslatedDocumentLikeRepository translatedDocumentLikeRepository;
	private final ObjectMapper objectMapper = new ObjectMapper();
	private final UserUtil userUtil;

	// 전체 문서 목록 조회
	@Override
	public List<DocumentDto> getAllDocuments(String sort, String order) {
		
		// 정렬 방식 설정
		Sort.Direction direction = order.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;

		// 정렬 기준 설정
		Sort sortOption = switch (sort.toLowerCase()) {
			case "newest" -> Sort.by(direction, "createdAt");
			case "view" -> Sort.by(direction, "viewCount");
			default -> Sort.by(direction, "documentName");
		};

		// 문서 목록 조회
		List<Document> documents = documentRepository.findAll(sortOption);

		// 문서 ID 목록 추출
		List<Integer> documentIds = documents.stream().map(Document::getDocsId).toList();

		// 다수의 문서 좋아요 정보 가져오기
		Map<Integer, List<Long>> likeUsersMap = documentLikeRepository.findLikedUserIdsByDocumentIds(documentIds)
				.stream()
				.collect(Collectors.groupingBy(
						result -> (Integer) result[0],  // 첫 번째 값 = 문서 ID
						Collectors.mapping(result -> (Long) result[1], Collectors.toList()) // 두 번째 값 = 유저 ID
				));

		return documents.stream().map(document -> {
			List<Long> likeUserIds = likeUsersMap.getOrDefault(document.getDocsId(), List.of());
			return new DocumentDto(
					document.getDocsId(),
					document.getDocumentCategory(),
					document.getDocumentName(),
					document.getDocumentLogo(),
					document.getDocumentVersion(),
					document.getViewCount(),
					likeUserIds.size(),
					document.getPosition(),
					document.getLicense(),
					document.getDocumentLink(),
					document.getCreatedAt(),
					likeUserIds
			);
		}).toList();
	}

	// 특정 문서 상세 조회
	@Override
	@Transactional
	public DocumentDto getDocumentDetail(Integer docsId) {
		// 문서 조회 (Optional 사용)
		Document document = documentRepository.findById(docsId)
				.orElseThrow(() -> new EntityNotFoundException("Document not found with id: " + docsId));

		// 조회수 증가
		document.setViewCount(document.getViewCount() + 1);

		// 좋아요한 유저들 조회
		List<Long> likeUserIds = documentLikeRepository.findLikedUserIdsByDocumentId(docsId);

		// DocumentDto 생성 후 반환
		return new DocumentDto(
				document.getDocsId(),
				document.getDocumentCategory(),
				document.getDocumentName(),
				document.getDocumentLogo(),
				document.getDocumentVersion(),
				document.getViewCount(),
				likeUserIds.size(), // ✅ likeCount = likeUserIds.size()
				document.getPosition(),
				document.getLicense(),
				document.getDocumentLink(),
				document.getCreatedAt(),
				likeUserIds
		);
	}

	// 문서 생성
	@Override
	@Transactional
	public DocumentDto createDocument(DocumentDto documentDto, User user) {
		if (!userUtil.isAdmin(user)) {
			throw new SecurityException("Only admins can create documents.");
		}

		Document document = new Document(
			documentDto.documentCategory(),
			documentDto.documentName(),
			documentDto.documentLogo(),
			documentDto.documentVersion(),
			documentDto.viewCount() != null ? documentDto.viewCount() : 0,
			documentDto.position(),
			documentDto.license(),
			documentDto.documentLink()
		);

		Document savedDocument = documentRepository.save(document);
		return DocumentDto.fromEntity(savedDocument, 0, List.of());
	}

	// 관심문서 등록 및 해제
	@Override
	@Transactional
	public DocumentDto toggleLikes(Integer docsId, User user) {
		// 현재 사용자가 해당 문서를 좋아요 했는지 확인
		boolean isLiked = documentLikeRepository.existsByDocument_DocsIdAndUser_UserId(docsId, user.getUserId());

		if (isLiked) {
			// 좋아요 취소
			documentLikeRepository.deleteByDocument_DocsIdAndUser_UserId(docsId, user.getUserId());
		} else {
			// 좋아요 등록
			customDocumentRepository.createByDocument_DocsIdAndUser_UserId(docsId, user.getUserId());
		}

		// 문서 정보 조회
		Document targetDocument = documentRepository.findById(docsId)
			.orElseThrow(() -> new EntityNotFoundException("Document not found with id: " + docsId));

		// 갱신된 좋아요 유저들 조회
		List<Long> likeUserIds = documentLikeRepository.findLikedUserIdsByDocumentId(docsId);
		int updatedLikeCount = likeUserIds.size();

		return DocumentDto.fromEntity(targetDocument, updatedLikeCount, likeUserIds);
	}

	// 유저 관심 문서 조회
	@Override
	public List<DocumentDto> getLikesDocument(Long userId) {
		return customDocumentRepository.findLikedDocumentsByUser(userId);
	}

	// 문서 원본(origin_document) 조회
	@Override
	public List<OriginDocumentDto> getAllOriginDocuments(Integer docsId) {
		List<OriginDocument> originDocuments = originDocumentRepository.findByDocument_DocsId(docsId);
		return originDocuments.stream()
			.map(OriginDocumentDto::fromEntity)
			.collect(Collectors.toList());
	}

	// 특정 단락 원본 조회
	@Override
	public OriginDocumentDto getOriginDocumentDetail(Integer originId) {
		OriginDocument originDocument = originDocumentRepository.findByOriginId(originId);
		if (originDocument == null) {
			throw new EntityNotFoundException("OriginDocument not found with id: " + originId);
		}
		return OriginDocumentDto.fromEntity(originDocument);
	}

	// 원본 생성
	@Override
	@Transactional
	public List<OriginDocumentDto> createOriginDocuments(Integer docsId, String content, User user) {

		if (!userUtil.isAdmin(user)) {
			throw new SecurityException("Only admins can create origin documents.");
		}

		System.out.println("[Service] Received docsId: " + docsId);
		System.out.println("[Service] Content Length: " + content.length());
		System.out.println("[Service] Preparing to run Python script...");

		try {

			String scriptPath = "src/main/resources/python/divide_by_tags.py";
			ProcessBuilder processBuilder = new ProcessBuilder("python", scriptPath);
			processBuilder.environment().put("PYTHONIOENCODING", "UTF-8");

			Process process = processBuilder.start();
			System.out.println("[Service] Python script started...");

			// Python에 데이터 전달
			try (OutputStream outputStream = process.getOutputStream()) {
				outputStream.write(content.getBytes(StandardCharsets.UTF_8));
				outputStream.flush();
				System.out.println("[Service] Sent content to Python script...");
			}

			// Python 출력 스트림 읽기
			StringBuilder resultJsonBuilder = new StringBuilder();
			try (BufferedReader reader = new BufferedReader(
				new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
				String line;
				while ((line = reader.readLine()) != null) {
					resultJsonBuilder.append(line);
				}
			}
			System.out.println("[Service] Received response from Python script...");

			// Python 에러 스트림 읽기
			StringBuilder errorBuilder = new StringBuilder();
			try (BufferedReader errorReader = new BufferedReader(
				new InputStreamReader(process.getErrorStream(), StandardCharsets.UTF_8))) {
				String line;
				while ((line = errorReader.readLine()) != null) {
					errorBuilder.append(line).append(System.lineSeparator());
				}
			}
			if (!errorBuilder.isEmpty()) {
				System.err.println("[Service] Python Script Error: " + errorBuilder.toString());
			}

			process.waitFor();
			if (process.exitValue() != 0) {
				throw new RuntimeException("Python script execution failed with exit code: " + process.exitValue());
			}

			String resultJson = resultJsonBuilder.toString();
			System.out.println(
				"[Service] Parsed JSON: " + (resultJson.length() > 100 ? resultJson.substring(0, 100) : resultJson));
			List<OriginDocumentDto> documents = objectMapper.readValue(resultJson,
				new TypeReference<List<OriginDocumentDto>>() {
				});

			Document document = documentRepository.findById(docsId)
				.orElseThrow(() -> new RuntimeException("Document not found with id: " + docsId));

			return documents.stream().map(dto -> {
				OriginDocument originDocument = new OriginDocument(
					document,
					dto.pOrder(),
					dto.tag(),
					dto.content()
				);

				OriginDocument savedEntity = originDocumentRepository.save(originDocument);
				return OriginDocumentDto.fromEntity(savedEntity);
			}).toList();

		} catch (Exception e) {
			throw new RuntimeException("Failed to process HTML content: " + e.getMessage(), e);
		}
	}

	// 특정 문서에 대한 번역 전체 조회
	@Override
	public List<TranslatedDocumentDto> getAllTranslatedDocuments(Integer docsId) {

		// 모든 번역 조회 (좋아요 개수 포함)
		List<TranslatedDocumentDto> documents = customDocumentRepository.findAllTrans(docsId);

		// 각 별 좋아요한 유저 ID 조회 후 추가
		for (int i = 0; i < documents.size(); i++) {
			List<Long> likeUserIds = translatedDocumentLikeRepository.findLikedUserIdsByTransId(documents.get(i).transId());
			Integer likeCount = likeUserIds.size();
			// 기존 DocumentDto를 새로 생성하여 likeUserIds 추가
			documents.set(i, new TranslatedDocumentDto(
					documents.get(i).transId(),
					documents.get(i).originId(),
					documents.get(i).userId(),
					documents.get(i).content(),
					documents.get(i).reportCount(),
					documents.get(i).status(),
					documents.get(i).createdAt(),
					documents.get(i).updatedAt(),
					likeCount,
					likeUserIds
			));
		}

		return documents;
	}

	// 특정 문서에 대한 베스트 번역 조회하기
	@Override
	public List<TranslatedDocumentDto> getBestTranslatedDocuments(Integer docsId) {
		List<TranslatedDocumentDto> documents = customDocumentRepository.findBestTrans(docsId);

		// 각 문서별 좋아요한 유저 ID 조회 후 추가
		for (int i = 0; i < documents.size(); i++) {
			List<Long> likeUserIds = translatedDocumentLikeRepository.findLikedUserIdsByTransId(documents.get(i).transId());

			// 기존 DocumentDto를 새로 생성하여 likeUserIds 추가
			documents.set(i, new DocumentDto(
					documents.get(i).transId(),
					documents.get(i).originId(),
					documents.get(i).userId(),
					documents.get(i).content(),
					documents.get(i).reportCount(),
					documents.get(i).status(),
					documents.get(i).likeCount(),
					documents.get(i).createdAt(),
					documents.get(i).updatedAt(),
					likeCount,
					likeUserIds
			));
		}

		return documents;
	}

	// 특정 문단에 대한 번역 전체 조회하기 (+좋아요)
	@Override
	public List<TranslatedDocumentDto> getTranslatedDocuments(Integer docsId, Integer originId, String sort, String order) {

		List<TranslatedDocumentDto> documents = customDocumentRepository.findTranslatedDocs(docsId, originId, sort, order);

		// 각 문서별 좋아요한 유저 ID 조회 후 추가
		for (int i = 0; i < documents.size(); i++) {
			List<Long> likeUserIds = translatedDocumentLikeRepository.findLikedUserIdsByTransId(documents.get(i).transId());

			// 기존 DocumentDto를 새로 생성하여 likeUserIds 추가
			documents.set(i, new DocumentDto(
					documents.get(i).transId(),
					documents.get(i).originId(),
					documents.get(i).userId(),
					documents.get(i).content(),
					documents.get(i).reportCount(),
					documents.get(i).status(),
					documents.get(i).likeCount(),
					documents.get(i).createdAt(),
					documents.get(i).updatedAt(),
					likeCount,
					likeUserIds
			));
		}

		return documents;
	}

	// 번역 작성하기
	@Override
	@Transactional
	public TranslatedDocumentDto createTranslatedDocument(Integer docsId, Integer originId, User user,
		String content) {
		// 원본 문서 조회
		OriginDocument originDocument = originDocumentRepository.findById(originId)
			.orElseThrow(() -> new EntityNotFoundException("OriginDocument not found with id: " + originId));

		// 번역 문서 생성
		TranslatedDocument translatedDocument = new TranslatedDocument(originDocument, user, content, 0, Status.VISIBLE);
		translatedDocumentRepository.save(translatedDocument);

		return TranslatedDocumentDto.fromEntity(translatedDocument, 0, List.of());
	}

	// 유저 번역 조회하기
	@Override
	public List<TranslatedDocumentDto> getUserTransDocument(Long userId) {
		List<TranslatedDocumentDto> documents = customDocumentRepository.findUserTrans(userId);

		// 각 문서별 좋아요한 유저 ID 조회 후 추가
		for (int i = 0; i < documents.size(); i++) {
			List<Long> likeUserIds = translatedDocumentLikeRepository.findLikedUserIdsByTransId(documents.get(i).transId());

			// 기존 DocumentDto를 새로 생성하여 likeUserIds 추가
			documents.set(i, new DocumentDto(
					documents.get(i).transId(),
					documents.get(i).originId(),
					documents.get(i).userId(),
					documents.get(i).content(),
					documents.get(i).reportCount(),
					documents.get(i).status(),
					documents.get(i).likeCount(),
					documents.get(i).createdAt(),
					documents.get(i).updatedAt(),
					likeCount,
					likeUserIds
			));
		}

		return documents;
	}

	// 번역 상세 조회
	@Override
	public TranslatedDocumentDto getTranslatedDocumentDetail(Integer docsId, Integer transId) {
		TranslatedDocumentDto translatedDocumentDto = customDocumentRepository.findTrans(transId);

		// docsId와 transId가 같은 문서에 속하는지 확인
		if (translatedDocumentDto == null || !translatedDocumentDto.originId().equals(docsId)) {
			throw new IllegalArgumentException("Invalid transId or docsId does not match");
		}

		return translatedDocumentDto;
	}

	// 번역 수정하기
	@Override
	@Transactional
	public TranslatedDocumentDto updateTranslatedDocument(Integer docsId, Integer transId, User user, String content) {
		// 해당하는 번역 문서 찾기
		TranslatedDocument translatedDocument = translatedDocumentRepository.findById(transId)
				.orElseThrow(() -> new EntityNotFoundException("Translated document not found with id: " + transId));

		// docsId와 transId가 일치하는지 검증
		if (!translatedDocument.getOriginDocument().getDocument().getDocsId().equals(docsId)) {
			throw new IllegalArgumentException("Invalid transId or docsId does not match");
		}

		// 작성자가 맞는지 확인 (작성자가 아니면 수정 불가)
		if (!translatedDocument.getUser().getUserId().equals(user.getUserId())) {
			throw new SecurityException("You are not the owner of this translation.");
		}

		// 내용 업데이트 후 저장
		translatedDocument.updateContent(content);

		return TranslatedDocumentDto.fromEntity(translatedDocument, translatedDocumentLikeRepository.countByTranslatedDocument_TransId(transId));
	}

	// 번역 삭제하기
	@Override
	@Transactional
	public void deleteTranslatedDocument(Integer docsId, Integer transId, User user) {
		// 번역 문서 조회
		TranslatedDocument translatedDocument = translatedDocumentRepository.findById(transId)
				.orElseThrow(() -> new EntityNotFoundException("Translated document not found with id: " + transId));

		// docsId와 transId의 문서가 일치하는지 검증
		if (!translatedDocument.getOriginDocument().getDocument().getDocsId().equals(docsId)) {
			throw new IllegalArgumentException("Invalid transId or docsId does not match");
		}

		// 삭제 권한 확인 (작성자 본인만 삭제 가능)
		if (!translatedDocument.getUser().getUserId().equals(user.getUserId())) {
			throw new SecurityException("You are not authorized to delete this translation.");
		}

		// 번역 삭제
		translatedDocumentRepository.delete(translatedDocument);
	}

	// 번역 투표 / 투표해제
	@Override
	@Transactional
	public boolean toggleVotes(Integer docsId, Integer transId, User user) {
		TranslatedDocument translatedDocument = translatedDocumentRepository.findById(transId)
				.orElseThrow(() -> new EntityNotFoundException("Translated document not found with id: " + transId));

		if (!translatedDocument.getOriginDocument().getDocument().getDocsId().equals(docsId)) {
			throw new IllegalArgumentException("Invalid transId or docsId does not match");
		}

		boolean hasVoted = translatedDocumentLikeRepository.existsByTranslatedDocument_TransIdAndUser_UserId(transId, user.getUserId());

		if (hasVoted) {
			translatedDocumentLikeRepository.deleteByTranslatedDocument_TransIdAndUser_UserId(transId, user.getUserId());
		} else {
			translatedDocumentLikeRepository.addVote(transId, user.getUserId());
		}

		return !hasVoted;
	}


	// 특정 유저가 좋아한 번역본 목록 조회
	@Override
	public List<TranslatedDocumentDto> getUserLikedTrans(Long userId) {
		List<TranslatedDocumentDto> documents = customDocumentRepository.findUserLikedTrans(userId);
		// 각 문서별 좋아요한 유저 ID 조회 후 추가
		for (int i = 0; i < documents.size(); i++) {
			List<Long> likeUserIds = translatedDocumentLikeRepository.findLikedUserIdsByTransId(documents.get(i).transId());

			// 기존 DocumentDto를 새로 생성하여 likeUserIds 추가
			documents.set(i, new DocumentDto(
					documents.get(i).transId(),
					documents.get(i).originId(),
					documents.get(i).userId(),
					documents.get(i).content(),
					documents.get(i).reportCount(),
					documents.get(i).status(),
					documents.get(i).likeCount(),
					documents.get(i).createdAt(),
					documents.get(i).updatedAt(),
					likeCount,
					likeUserIds
			));
		}

		return documents;
	}

}

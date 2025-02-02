package com.ssafy.docshund.domain.docs.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.OriginDocumentDto;
import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.entity.OriginDocument;
import com.ssafy.docshund.domain.docs.repository.CustomDocumentRepository;
import com.ssafy.docshund.domain.docs.repository.DocumentRepository;
import com.ssafy.docshund.domain.docs.repository.OriginDocumentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DocsServiceImpl implements DocsService {

	private final DocumentRepository documentRepository;
	private final OriginDocumentRepository originDocumentRepository;
	private final CustomDocumentRepository customDocumentRepository;
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Autowired
	public DocsServiceImpl(DocumentRepository documentRepository,
		OriginDocumentRepository originDocumentRepository,
		CustomDocumentRepository customDocumentRepository) {
		this.documentRepository = documentRepository;
		this.originDocumentRepository = originDocumentRepository;
		this.customDocumentRepository = customDocumentRepository;
	}

	// 전체 문서 목록 조회
	@Override
	@Transactional(readOnly = true)
	public List<DocumentDto> getAllDocuments() {
		return customDocumentRepository.findAllDocumentsWithLikes();
	}

	// 특정 문서 상세 조회
	@Override
	@Transactional
	public DocumentDto getDocumentDetail(Integer docsId) {
		// 좋아요 수 포함된 문서 조회
		DocumentDto documentDto = customDocumentRepository.findDocumentWithLikes(docsId);
		if (documentDto == null) {
			throw new EntityNotFoundException("Document not found with id: " + docsId);
		}

		Document document = documentRepository.findByDocsId(docsId);
		if (document == null) {
			throw new EntityNotFoundException("Document entity not found with id: " + docsId);
		}

		// 조회수 증가
		document.setViewCount(document.getViewCount() + 1);
		documentRepository.save(document);

		return new DocumentDto(
			documentDto.docsId(),
			documentDto.documentCategory(),
			documentDto.documentName(),
			documentDto.documentLogo(),
			documentDto.documentVersion(),
			document.getViewCount(),
			documentDto.likeCount(),
			documentDto.position(),
			documentDto.license(),
			documentDto.documentLink(),
			documentDto.createdAt()
		);
	}

	// 문서 생성
	@Override
	@Transactional
	public DocumentDto createDocument(DocumentDto documentDto) {
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
		return DocumentDto.fromEntity(savedDocument, 0);
	}

	// 관심문서 등록 및 해제
	@Override
	public DocumentDto toggleLikes(Integer docsId, long currentUserId) {
		// 현재 사용자가 해당 문서를 좋아요 했는지 확인
		boolean isLiked = customDocumentRepository.isLikedByUser(docsId, currentUserId);

		if (isLiked) {
			// 좋아요 취소
			customDocumentRepository.removeLike(docsId, currentUserId);
		} else {
			// 좋아요 등록
			customDocumentRepository.addLike(docsId, currentUserId);
		}

		// 갱신된 좋아요 개수 조회
		int updatedLikeCount = customDocumentRepository.getLikeCount(docsId);

		// 문서 정보 조회
		Document targetDocument = documentRepository.findById(docsId)
			.orElseThrow(() -> new EntityNotFoundException("Document not found with id: " + docsId));

		// `likeCount`를 포함하여 DTO 생성 후 반환
		return DocumentDto.fromEntity(targetDocument, updatedLikeCount);
	}

	// 문서 원본(origin_document) 조회
	@Override
	@Transactional(readOnly = true)
	public List<OriginDocumentDto> getAllOriginDocuments(Integer docsId) {
		List<OriginDocument> originDocuments = originDocumentRepository.findByDocument_DocsId(docsId);
		return originDocuments.stream()
			.map(OriginDocumentDto::fromEntity)
			.collect(Collectors.toList());
	}

	// 특정 단락 원본 조회
	@Override
	@Transactional(readOnly = true)
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
	public List<OriginDocumentDto> createOriginDocuments(Integer docsId, String content) {
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
				return OriginDocumentDto.fromEntity(savedEntity); // 엔티티를 DTO로 변환
			}).toList();

		} catch (Exception e) {
			throw new RuntimeException("Failed to process HTML content: " + e.getMessage(), e);
		}
	}

}

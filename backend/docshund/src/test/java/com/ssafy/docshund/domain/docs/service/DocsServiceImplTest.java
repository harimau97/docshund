package com.ssafy.docshund.domain.docs.service;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import com.ssafy.docshund.domain.docs.repository.*;
import com.ssafy.docshund.domain.users.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.CacheManager;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.OriginDocumentDto;
import com.ssafy.docshund.domain.docs.dto.TranslatedDocumentDto;
import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.entity.Position;
import com.ssafy.docshund.domain.users.entity.Provider;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.fixture.UserTestHelper;
import com.ssafy.docshund.fixture.WithMockCustomOAuth2User;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class DocsServiceImplTest {

	@Autowired
	private DocsService docsService;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DocumentRepository documentRepository;
	@Autowired
	private DocumentLikeRepository documentLikeRepository;
	@Autowired
	private OriginDocumentRepository originDocumentRepository;
	@Autowired
	private TranslatedDocumentRepository translatedDocumentRepository;
	@Autowired
	private TranslatedDocumentLikeRepository translatedDocumentLikeRepository;
	@Autowired
	private CustomDocumentRepository customDocumentRepository;

	private User user1;	// 어드민 유저
	private User user2; // 번역 UD 테스트용 유저

	@MockitoBean
	private UserUtil userUtil;

	@Autowired
	private UserTestHelper userTestHelper;

	@BeforeEach
	public void setUp() {
		// user repository setup
		user1 = userRepository.findById(7L).orElse(null);
		user2 = userRepository.findById(6L).orElse(null);
		// document repository setup
		Document doc1 = documentRepository.save(new Document("Spring", "Spring Boot", "logoImage", "v1",
			0, Position.BACKEND, "apache", "docLink"));
		Document doc2 = documentRepository.save(new Document("MySQL", "MySQL", "logoImage", "v1",
			0, Position.DBSQL, "apache", "docLink"));
	}

	@Test
	@DisplayName("문서 목록 조회 테스트")
	void getAllDocuments() {
		// given
		String sort = "newest";
		String order = "desc";

		// when
		List<DocumentDto> result = docsService.getAllDocuments(sort, order);

		// then
		assertThat(result).isNotNull();
		assertThat(result).isNotEmpty();
		log.info("문서 목록 조회 결과: {}", result);
	}

	@Test
	@DisplayName("특정 문서 상세 조회 테스트")
	void getDocumentDetail() {
		// given
		Integer docsId = 1;

		// when
		DocumentDto result = docsService.getDocumentDetail(docsId);

		// then
		assertThat(result).isNotNull();
		log.info("문서 상세 조회 결과: {}", result);
	}

	@Test
	@DisplayName("문서 작성 테스트")
	void createDocument() {
		// given
		DocumentDto documentDto = new DocumentDto(
			null,
			"Category",
			"New Document",
			"logo.png",
			"v1.0",
			0,
			0,
			Position.BACKEND,
			"Apache",
			"http://link.com",
			LocalDateTime.now(),
			List.of()
		);

		// when
		Mockito.when(userUtil.getUser()).thenReturn(user1);
		Mockito.when(userUtil.isAdmin(Mockito.any())).thenReturn(true);
		User user = userUtil.getUser();
		DocumentDto result = docsService.createDocument(documentDto, user);

		// then
		assertThat(result).isNotNull();
		log.info("문서 작성 결과: {}", result);
	}

	@Test
	@WithMockCustomOAuth2User
	@DisplayName("문서 좋아요 등록/취소 테스트")
	void toggleLikes() {
		// given
		Integer docsId = 1;

		// when
		DocumentDto result = docsService.toggleLikes(docsId, user1);

		// then
		assertThat(result).isNotNull();
		log.info("문서 좋아요 결과: {}", result);
	}

	@Test
	@WithMockCustomOAuth2User
	@DisplayName("유저가 좋아한 관심 문서 조회 테스트")
	void getLikesDocument() {

		// when
		List<DocumentDto> result = docsService.getLikesDocument(user1.getUserId());

		// then
		assertThat(result).isNotNull();
		log.info("유저 관심 문서 조회 결과: {}", result);
	}

	@Test
	@DisplayName("원본 문서 조회 테스트 (전체)")
	void getAllOriginDocuments() {
		// given
		Integer docsId = 1;

		// when
		List<OriginDocumentDto> result = docsService.getAllOriginDocuments(docsId);

		// then
		assertThat(result).isNotNull();
		log.info("원본 문서 조회 결과: {}", result);
	}

	@Test
	@DisplayName("원본 문서 등록 테스트")
	void createOriginDocuments() {
		// given
		Integer docsId = 1;
		String content = "<p>문서 내용</p>";

		// when
		Mockito.when(userUtil.getUser()).thenReturn(user1);
		Mockito.when(userUtil.isAdmin(Mockito.any())).thenReturn(true);
		User user = userUtil.getUser();

		List<OriginDocumentDto> result = docsService.createOriginDocuments(docsId, content, user);

		// then
		assertThat(result).isNotNull();
		log.info("원본 문서 등록 결과: {}", result);
	}

	@Test
	@DisplayName("특정 문서에 대한 번역 문서 목록 전체 조회 테스트")
	void getAllTranslatedDocuments() {
		// given
		Integer docsId = 1;

		// when
		List<TranslatedDocumentDto> result = docsService.getAllTranslatedDocuments(docsId);

		// then
		assertThat(result).isNotNull();
		log.info("번역 문서 목록 조회 결과: {}", result);
	}

	@Test
	@DisplayName("특정 문서 내 베스트 번역본 조회 테스트")
	void getBestTranslatedDocuments() {
		// given
		Integer docsId = 1;

		// when
		List<TranslatedDocumentDto> result = docsService.getBestTranslatedDocuments(docsId);

		// then
		assertThat(result).isNotNull();
		log.info("베스트 번역 조회 결과: {}", result);
	}

	@Test
	@WithMockCustomOAuth2User
	@DisplayName("번역 작성 테스트")
	void createTranslatedDocument() {
		// given
		Integer docsId = 1;
		Integer originId = 1;
		String content = "새 번역 내용";

		// when
		TranslatedDocumentDto result = docsService.createTranslatedDocument(docsId, originId, user1, content);

		// then
		assertThat(result).isNotNull();
		log.info("번역 작성 결과: {}", result);
	}

	@Test
	@WithMockCustomOAuth2User
	@DisplayName("번역 수정 테스트")
	void updateTranslatedDocument() {
		// given
		Integer docsId = 1;
		Integer transId = 2;
		String content = "수정된 번역 내용";

		// when
		TranslatedDocumentDto result = docsService.updateTranslatedDocument(docsId, transId, user2, content);

		// then
		assertThat(result).isNotNull();
		log.info("번역 수정 결과: {}", result);
	}

	@Test
	@WithMockCustomOAuth2User
	@DisplayName("번역 삭제 테스트")
	void deleteTranslatedDocument() {
		// given
		Integer docsId = 1;
		Integer transId = 2;

		// when
		docsService.deleteTranslatedDocument(docsId, transId, user2);

		// then
		log.info("번역 삭제 성공");
	}

	@Test
	@WithMockCustomOAuth2User
	@DisplayName("번역 좋아요 테스트")
	void toggleVotes() {
		// given
		Integer docsId = 1;
		Integer transId = 2;

		// when
		boolean result = docsService.toggleVotes(docsId, transId, user1);

		// then
		assertThat(result).isTrue();
		log.info("번역 좋아요 결과: {}", result);
	}
}

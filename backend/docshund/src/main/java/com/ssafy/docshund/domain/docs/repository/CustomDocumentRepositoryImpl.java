package com.ssafy.docshund.domain.docs.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.TranslatedDocumentDto;
import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.entity.QDocument;
import com.ssafy.docshund.domain.docs.entity.QDocumentLike;
import com.ssafy.docshund.domain.docs.entity.QOriginDocument;
import com.ssafy.docshund.domain.docs.entity.QTranslatedDocument;
import com.ssafy.docshund.domain.docs.entity.QTranslatedDocumentLike;
import com.ssafy.docshund.domain.users.entity.QUser;
import com.ssafy.docshund.domain.users.entity.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class CustomDocumentRepositoryImpl implements CustomDocumentRepository {

	@PersistenceContext
	private EntityManager entityManager;
	private final JPAQueryFactory queryFactory;

	public CustomDocumentRepositoryImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
		this.queryFactory = new JPAQueryFactory(entityManager);
	}

	private OrderSpecifier<?> getOrderSpecifier(String sort, String order, QDocument document) {
		// 정렬 순서 처리 (asc, desc)
		Order orderDirection = order.equalsIgnoreCase("desc") ? Order.DESC : Order.ASC;

		// 정렬 기준 처리
		return switch (sort.toLowerCase()) {
			case "newest" -> new OrderSpecifier<>(orderDirection, document.createdAt);
			case "view" -> new OrderSpecifier<>(orderDirection, document.viewCount);
			case "like" -> new OrderSpecifier<>(orderDirection, document.docsId.countDistinct()); // 좋아요 개수 정렬
			default -> new OrderSpecifier<>(orderDirection, document.documentName);
		};
	}

	// 문서 전체 조회 (좋아요 개수 포함)
	@Override
	public List<DocumentDto> findAllDocumentsWithLikes(String sort, String order) {
		QDocument document = QDocument.document;
		QDocumentLike documentLike = QDocumentLike.documentLike;

		// 정렬 기준에 따른 동적 처리
		OrderSpecifier<?> sortOrder = getOrderSpecifier(sort, order, document);

		return queryFactory
			.select(Projections.constructor(DocumentDto.class,
				document.docsId,
				document.documentCategory,
				document.documentName,
				document.documentLogo,
				document.documentVersion,
				document.viewCount,
				documentLike.countDistinct().intValue(),
				document.position,
				document.license,
				document.documentLink,
				document.createdAt
			))
			.from(document)
			.leftJoin(documentLike).on(document.eq(documentLike.document))
			.groupBy(document.docsId)
			.orderBy(sortOrder) // 동적 정렬 추가
			.fetch();
	}

	// 특정 문서의 상세 조회 (좋아요 개수 포함)
	@Override
	public DocumentDto findDocumentWithLikes(Integer docsId) {
		QDocument document = QDocument.document;
		QDocumentLike documentLike = QDocumentLike.documentLike;

		return queryFactory
			.select(Projections.constructor(DocumentDto.class,
				document.docsId,
				document.documentCategory,
				document.documentName,
				document.documentLogo,
				document.documentVersion,
				document.viewCount,
				documentLike.countDistinct().intValue(),
				document.position,
				document.license,
				document.documentLink,
				document.createdAt
			))
			.from(document)
			.leftJoin(documentLike).on(document.eq(documentLike.document))
			.where(document.docsId.eq(docsId))
			.groupBy(document.docsId)
			.fetchOne();
	}

	// 좋아요 추가
	@Override
	public void addLike(Integer docsId, long currentUserId) {
		QDocument document = QDocument.document;
		QUser user = QUser.user;

		Document foundDocument = queryFactory
			.selectFrom(document)
			.where(document.docsId.eq(docsId))
			.fetchOne();

		User foundUser = queryFactory
			.selectFrom(user)
			.where(user.userId.eq(currentUserId))
			.fetchOne();

		if (foundDocument != null && foundUser != null) {
			queryFactory
				.insert(QDocumentLike.documentLike)
				.columns(QDocumentLike.documentLike.document, QDocumentLike.documentLike.user)
				.values(foundDocument, foundUser)
				.execute();
		}
	}

	// 특정 유저의 관심문서 조회
	@Override
	public List<DocumentDto> findLikedDocumentsByUser(Long userId) {
		QDocument document = QDocument.document;
		QDocumentLike documentLike = QDocumentLike.documentLike;

		return queryFactory
			.select(Projections.constructor(DocumentDto.class,
				document.docsId,
				document.documentCategory,
				document.documentName,
				document.documentLogo,
				document.documentVersion,
				document.viewCount,
				documentLike.countDistinct().intValue(),  // 좋아요 개수
				document.position,
				document.license,
				document.documentLink,
				document.createdAt
			))
			.from(documentLike)
			.join(document).on(documentLike.document.docsId.eq(document.docsId))
			.where(documentLike.user.userId.eq(userId))
			.groupBy(document.docsId)
			.orderBy(document.createdAt.desc()) // 최신순 정렬
			.fetch();
	}

	// 번역본 조회 공통 로직
	private List<TranslatedDocumentDto> getTranslatedDocuments(List<Long> transIds, Integer docsId, Long userId) {
		QTranslatedDocument translatedDocument = QTranslatedDocument.translatedDocument;
		QTranslatedDocumentLike translatedDocumentLike = QTranslatedDocumentLike.translatedDocumentLike;
		QOriginDocument originDocument = QOriginDocument.originDocument;
		QUser user = QUser.user;

		// 전체 문서 번역 or 특정 유저 번역
		BooleanExpression condition =
			(docsId != null) ? originDocument.document.docsId.eq(docsId) : user.userId.eq(userId);

		// 베스트 번역 조회시
		if (transIds != null) {
			condition = condition.and(translatedDocument.transId.in(transIds));
		}

		return queryFactory
			.select(Projections.constructor(TranslatedDocumentDto.class,
				translatedDocument.transId,
				originDocument.originId,
				user.userId,
				translatedDocument.content,
				translatedDocument.reportCount,
				translatedDocument.status,
				translatedDocument.createdAt,
				translatedDocument.updatedAt,
				translatedDocumentLike.countDistinct().intValue() // ✅ 좋아요 개수 포함
			))
			.from(translatedDocument)
			.leftJoin(translatedDocumentLike)
			.on(translatedDocument.transId.eq(translatedDocumentLike.translatedDocument.transId))
			.join(translatedDocument.originDocument, originDocument)
			.join(translatedDocument.user, user)
			.where(condition) // ✅ 동적 조건 적용
			.groupBy(translatedDocument.transId, originDocument.originId, user.userId)
			.orderBy(originDocument.pOrder.asc()) // ✅ 문단순서 정렬
			.fetch();
	}

	// 특정 문서의 모든 번역 조회 (좋아요 포함, 문단순서별 정렬)
	@Override
	public List<TranslatedDocumentDto> findAllTransWithLikes(Integer docsId) {
		return getTranslatedDocuments(null, docsId, null); // 모든 번역 조회
	}

	// 특정 문서의 베스트 번역 조회 (좋아요 포함)
	@Override
	public List<TranslatedDocumentDto> findBestTransWithLikes(Integer docsId) {
		QTranslatedDocument translatedDocument = QTranslatedDocument.translatedDocument;
		QTranslatedDocumentLike translatedDocumentLike = QTranslatedDocumentLike.translatedDocumentLike;
		QOriginDocument originDocument = QOriginDocument.originDocument;

		// ✅ 각 originId별 좋아요 개수가 가장 많은 transId 찾기
		List<Long> bestTransIds = queryFactory
			.select(translatedDocument.transId)
			.from(translatedDocument)
			.leftJoin(translatedDocumentLike)
			.on(translatedDocument.transId.eq(translatedDocumentLike.translatedDocument.transId))
			.join(translatedDocument.originDocument, originDocument)
			.where(originDocument.document.docsId.eq(docsId))
			.groupBy(originDocument.originId, translatedDocument.transId)
			.orderBy(originDocument.originId.asc(), translatedDocumentLike.countDistinct().desc()) // ✅ 좋아요 개수 내림차순
			.distinct()
			.fetch();

		return getTranslatedDocuments(bestTransIds, docsId, null);
	}

	// 특정 유저의 번역 조회 (좋아요 포함)
	@Override
	public List<TranslatedDocumentDto> findUserTransWithLikes(long userId) {
		return getTranslatedDocuments(null, null, userId); // 특정 유저의 번역 조회
	}
}

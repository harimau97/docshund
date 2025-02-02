package com.ssafy.docshund.domain.docs.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.entity.QDocument;
import com.ssafy.docshund.domain.docs.entity.QDocumentLike;
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

	// 문서 전체 조회 (좋아요 개수 포함)
	@Override
	public List<DocumentDto> findAllDocumentsWithLikes() {
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
			.groupBy(document.docsId)
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

	// 특정 유저가 문서를 좋아요 했는지 확인
	@Override
	public boolean isLikedByUser(Integer docsId, long currentUserId) {
		QDocumentLike documentLike = QDocumentLike.documentLike;

		Long count = queryFactory
			.select(documentLike.count())
			.from(documentLike)
			.where(
				documentLike.document.docsId.eq(docsId),
				documentLike.user.userId.eq(currentUserId)
			)
			.fetchOne();

		return count != null && count > 0;
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

	// 좋아요 제거
	@Override
	public void removeLike(Integer docsId, long currentUserId) {
		queryFactory
			.delete(QDocumentLike.documentLike)
			.where(
				QDocumentLike.documentLike.document.docsId.eq(docsId),
				QDocumentLike.documentLike.user.userId.eq(currentUserId)
			)
			.execute();
	}

	// 좋아요 개수 조회
	@Override
	public int getLikeCount(Integer docsId) {
		QDocumentLike documentLike = QDocumentLike.documentLike;

		Long count = queryFactory
			.select(documentLike.count())
			.from(documentLike)
			.where(documentLike.document.docsId.eq(docsId))
			.fetchOne();

		return count != null ? count.intValue() : 0;
	}

}

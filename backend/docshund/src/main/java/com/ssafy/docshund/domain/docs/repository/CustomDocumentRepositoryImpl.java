package com.ssafy.docshund.domain.docs.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.entity.QDocument;
import com.ssafy.docshund.domain.docs.entity.QDocumentLike;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomDocumentRepositoryImpl implements CustomDocumentRepository {

    @PersistenceContext
    private EntityManager entityManager;

    private final JPAQueryFactory queryFactory;

    public CustomDocumentRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    // ✅ 문서 전체 조회 (좋아요 개수 포함)
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
                        documentLike.count().intValue(), // ✅ 좋아요 개수
                        document.position,
                        document.license,
                        document.documentLink,
                        document.createdAt
                ))
                .from(document)
                .leftJoin(documentLike).on(document.docsId.eq(documentLike.document.docsId)) // ✅ JOIN
                .groupBy(document.docsId) // ✅ 문서별 그룹화
                .fetch();
    }

    // ✅ 특정 문서의 상세 조회 (좋아요 개수 포함)
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
                        documentLike.count().intValue(), // ✅ 좋아요 개수
                        document.position,
                        document.license,
                        document.documentLink,
                        document.createdAt
                ))
                .from(document)
                .leftJoin(documentLike).on(document.docsId.eq(documentLike.document.docsId)) // ✅ JOIN
                .where(document.docsId.eq(docsId)) // ✅ 특정 문서 조건
                .groupBy(document.docsId) // ✅ 그룹화
                .fetchOne();
    }
}

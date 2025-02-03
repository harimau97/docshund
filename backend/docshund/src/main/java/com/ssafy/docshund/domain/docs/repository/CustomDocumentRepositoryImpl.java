//package com.ssafy.docshund.domain.docs.repository;
//
//import java.util.*;
//import java.util.stream.Collectors;
//
//import com.querydsl.core.Tuple;
//import com.querydsl.core.types.dsl.NumberExpression;
//import com.querydsl.jpa.JPAExpressions;
//import org.springframework.stereotype.Repository;
//
//import com.querydsl.core.types.Order;
//import com.querydsl.core.types.OrderSpecifier;
//import com.querydsl.core.types.Projections;
//import com.querydsl.core.types.dsl.BooleanExpression;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.docshund.domain.docs.dto.DocumentDto;
//import com.ssafy.docshund.domain.docs.dto.TranslatedDocumentDto;
//import com.ssafy.docshund.domain.docs.entity.Document;
//import com.ssafy.docshund.domain.docs.entity.QDocument;
//import com.ssafy.docshund.domain.docs.entity.QDocumentLike;
//import com.ssafy.docshund.domain.docs.entity.QOriginDocument;
//import com.ssafy.docshund.domain.docs.entity.QTranslatedDocument;
//import com.ssafy.docshund.domain.docs.entity.QTranslatedDocumentLike;
//import com.ssafy.docshund.domain.users.entity.QUser;
//import com.ssafy.docshund.domain.users.entity.User;
//
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//
//@Repository
//public class CustomDocumentRepositoryImpl implements CustomDocumentRepository {
//
//	@PersistenceContext
//	private EntityManager entityManager;
//	private final JPAQueryFactory queryFactory;
//
//	public CustomDocumentRepositoryImpl(EntityManager entityManager) {
//		this.entityManager = entityManager;
//		this.queryFactory = new JPAQueryFactory(entityManager);
//	}
//
//	// 관심문서 좋아요 추가
//	@Override
//	public void addLike(Integer docsId, long currentUserId) {
//
//	}
//
//	// 베스트 번역본 조회
//	@Override
//	public List<TranslatedDocumentDto> findBestTrans(Integer docsId) {
//		return List.of();
//	}
//
//	// 특정 문단에 대한 번역본 전체 조회
//	@Override
//	public List<TranslatedDocumentDto> findTranslatedDocs(Integer docsId, Integer originId, String sort, String order) {
//		return List.of();
//	}
//}

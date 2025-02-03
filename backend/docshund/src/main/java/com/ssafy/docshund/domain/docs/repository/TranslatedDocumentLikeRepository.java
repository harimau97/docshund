package com.ssafy.docshund.domain.docs.repository;

import com.ssafy.docshund.domain.docs.entity.TranslatedDocumentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface TranslatedDocumentLikeRepository extends
        JpaRepository<TranslatedDocumentLike, Integer> {

    // 특정 유저가 번역문서에 좋아요 했는지 여부 확인
    boolean existsByTranslatedDocument_TransIdAndUser_UserId(Integer transId,
                                                             Long currentUserId);

    // 유저의 번역문서 좋아요 취소
    void deleteByTranslatedDocument_TransIdAndUser_UserId(Integer transId,
                                                          Long currentUserId);
    // 번역문서 좋아요 개수 조회
    int countByTranslatedDocument_TransId(Integer transId);

    // 번역문서 좋아요 추가
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO translated_document_like(trans_id, user_id) VALUES (:transId, :userId)", nativeQuery = true)
    void addVote(@Param("transId") Integer transId, @Param("userId") Long userId);
}

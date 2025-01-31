package com.ssafy.docshund.domain.docs.repository;

import com.ssafy.docshund.domain.docs.entity.OriginDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OriginDocumentRepository extends JpaRepository<OriginDocument, Integer> {

    // 특정 문서의 원본 조회 (전체)
    List<OriginDocument> findByDocument_DocsId(Integer docsId);

    // 특정 문서의 특정 단락 원본 조회
    OriginDocument findByOriginId(Integer originId);

}

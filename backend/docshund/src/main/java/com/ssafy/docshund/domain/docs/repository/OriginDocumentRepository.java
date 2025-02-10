package com.ssafy.docshund.domain.docs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.docshund.domain.docs.entity.OriginDocument;

@Repository
public interface OriginDocumentRepository extends JpaRepository<OriginDocument, Integer> {

	// 특정 문서의 원본 조회 (전체)
	List<OriginDocument> findByDocument_DocsId(Integer docsId);

	// 특정 문서의 특정 단락 원본 조회
	Optional<OriginDocument> findByOriginId(Integer originId);

}

package com.ssafy.docshund.domain.docs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.entity.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {

	Document findByDocsId(Integer docsId);

	List<DocumentDto> findLikesDocument(Integer userId);
}

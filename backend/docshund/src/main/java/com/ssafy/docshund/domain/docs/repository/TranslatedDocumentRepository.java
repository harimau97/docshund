package com.ssafy.docshund.domain.docs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.docshund.domain.docs.entity.TranslatedDocument;

public interface TranslatedDocumentRepository extends JpaRepository<TranslatedDocument, Integer> {

}

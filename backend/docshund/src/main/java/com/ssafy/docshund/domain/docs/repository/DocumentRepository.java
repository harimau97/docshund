package com.ssafy.docshund.domain.docs.repository;

import com.ssafy.docshund.domain.docs.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {

    Document findByDocsId(Integer docsId);

}

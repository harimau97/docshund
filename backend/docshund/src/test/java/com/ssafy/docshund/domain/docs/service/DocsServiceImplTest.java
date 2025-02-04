package com.ssafy.docshund.domain.docs.service;

import com.ssafy.docshund.domain.docs.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;


@Slf4j
@SpringBootTest
@Transactional
class DocsServiceImplTest {

    @Autowired
    private DocumentRepository documentRepository;
    private OriginDocumentRepository originDocumentRepository;
    private TranslatedDocumentRepository translatedDocumentRepository;
    private CustomDocumentRepository customDocumentRepository;
    private DocumentLikeRepository documentLikeRepository;
    private TranslatedDocumentLikeRepository translatedDocumentLikeRepository;

    @Autowired
    private DocsService docsService;

}

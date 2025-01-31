package com.ssafy.docshund.domain.docs.service;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.OriginDocumentDto;
import com.ssafy.docshund.domain.docs.entity.Document;
import com.ssafy.docshund.domain.docs.entity.OriginDocument;
import com.ssafy.docshund.domain.docs.repository.DocumentRepository;
import com.ssafy.docshund.domain.docs.repository.OriginDocumentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocsServiceImpl implements DocsService {

    private final DocumentRepository documentRepository;
    private final OriginDocumentRepository originDocumentRepository;

    @Autowired
    public DocsServiceImpl(DocumentRepository documentRepository, OriginDocumentRepository originDocumentRepository) {
        this.documentRepository = documentRepository;
        this.originDocumentRepository = originDocumentRepository;
    }

    // 전체 문서 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<DocumentDto> getAllDocuments() {
        return documentRepository.findAll().stream()
                .map(DocumentDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 특정 문서 상세 조회
    @Override
    @Transactional(readOnly = true)
    public DocumentDto getDocumentDetail(Integer docsId) {
        Document document = documentRepository.findByDocsId(docsId);
        if (document == null) {
            throw new EntityNotFoundException("Document not found with id: " + docsId);
        }
        return DocumentDto.fromEntity(document);
    }

    // 문서 생성
    @Override
    @Transactional
    public DocumentDto createDocument(DocumentDto documentDto) {
        Document document = new Document(
                documentDto.documentCategory(),
                documentDto.documentName(),
                documentDto.documentLogo(),
                documentDto.documentVersion(),
                documentDto.viewCount() != null ? documentDto.viewCount() : 0,
                documentDto.position(),
                documentDto.license(),
                documentDto.documentLink()
        );

        Document savedDocument = documentRepository.save(document);
        return DocumentDto.fromEntity(savedDocument);
    }

    // 문서 원본(origin_document) 조회
    @Override
    @Transactional(readOnly = true)
    public List<OriginDocumentDto> getAllOriginDocuments(Integer docsId) {
        List<OriginDocument> originDocuments = originDocumentRepository.findByDocument_DocsId(docsId);
        return originDocuments.stream()
                .map(OriginDocumentDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 특정 단락 원본 조회
    @Override
    @Transactional(readOnly = true)
    public OriginDocumentDto getOriginDocumentDetail(Integer originId) {
        OriginDocument originDocument = originDocumentRepository.findByOriginId(originId);
        if (originDocument == null) {
            throw new EntityNotFoundException("OriginDocument not found with id: " + originId);
        }
        return OriginDocumentDto.fromEntity(originDocument);
    }

    // 문서 원본 생성 (빌더 제거)
    @Override
    @Transactional
    public OriginDocumentDto createOriginDocument(OriginDocumentDto originDocumentDto) {
        Document document = documentRepository.findByDocsId(originDocumentDto.docsId());
        if (document == null) {
            throw new EntityNotFoundException("Document not found with id: " + originDocumentDto.docsId());
        }

        OriginDocument originDocument = new OriginDocument(
                document,
                originDocumentDto.pOrder(),
                originDocumentDto.tag(),
                originDocumentDto.content()
        );

        OriginDocument savedOriginDocument = originDocumentRepository.save(originDocument);
        return OriginDocumentDto.fromEntity(savedOriginDocument);
    }
}

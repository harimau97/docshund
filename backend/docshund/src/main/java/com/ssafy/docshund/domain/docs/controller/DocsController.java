package com.ssafy.docshund.domain.docs.controller;

import com.ssafy.docshund.domain.docs.dto.DocumentDto;
import com.ssafy.docshund.domain.docs.dto.OriginDocumentDto;
import com.ssafy.docshund.domain.docs.service.DocsService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/docs")
@RequiredArgsConstructor
public class DocsController {

    private final DocsService docsService;

    // 문서 목록 조회
    @GetMapping("")
    public ResponseEntity<List<DocumentDto>> getDocs() {
        List<DocumentDto> documents = docsService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    // 문서 정보(Document) 등록
    @PostMapping("")
    public ResponseEntity<DocumentDto> postDocs(@RequestBody DocumentDto documentDto) {
        DocumentDto createdDocument = docsService.createDocument(documentDto);
        return ResponseEntity.ok(createdDocument);
    }

    // 문서 정보 상세 조회
    @GetMapping("/{docsId}")
    public ResponseEntity<DocumentDto> getDocsDetail(@PathVariable Integer docsId) {
        DocumentDto document = docsService.getDocumentDetail(docsId);
        return ResponseEntity.ok(document);
    }

    // 받은 원본 문서를 파싱하여 생성
    @PostMapping("/{docsId}/origin")
    public ResponseEntity<List<OriginDocumentDto>> postOriginDocs(
            @PathVariable Integer docsId,
            @RequestParam String content
    ) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Content is empty or null");
        }
        List<OriginDocumentDto> createdDocs = docsService.createOriginDocuments(docsId, content);
        return ResponseEntity.ok(createdDocs);
    }

    // 원본 문서(OriginDocument) 조회 (전체 조회 / 단락별 조회)
    @GetMapping("/{docsId}/origin")
    public ResponseEntity<?> getOriginDocs(
            @PathVariable Integer docsId,
            @RequestParam(required = false) Integer originId
    ) {
        if (originId == null) {
            // ✅ 전체 원본 조회 (QueryParam이 없을 경우)
            List<OriginDocumentDto> originDocuments = docsService.getAllOriginDocuments(docsId);
            return ResponseEntity.ok(originDocuments);
        } else {
            // ✅ 특정 단락 원본 조회 (QueryParam 존재 시)
            OriginDocumentDto originDocument = docsService.getOriginDocumentDetail(originId);
            return ResponseEntity.ok(originDocument);
        }
    }
}

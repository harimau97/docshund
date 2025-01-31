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

    // ✅ 문서 목록 조회 (GET /docs)
    @GetMapping("")
    public ResponseEntity<List<DocumentDto>> getDocs() {
        List<DocumentDto> documents = docsService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    // ✅ 문서 정보(Document) 등록 (POST /docs)
    @PostMapping("")
    public ResponseEntity<DocumentDto> postDocs(@RequestBody DocumentDto documentDto) {
        DocumentDto createdDocument = docsService.createDocument(documentDto);
        return ResponseEntity.ok(createdDocument);
    }

    // ✅ 문서 정보 상세 조회 (GET /docs/{docsId})
    @GetMapping("/{docsId}")
    public ResponseEntity<DocumentDto> getDocsDetail(@PathVariable Integer docsId) {
        DocumentDto document = docsService.getDocumentDetail(docsId);
        return ResponseEntity.ok(document);
    }

    // ✅ 원본 문서(OriginDocument) 등록 (POST /docs/{docsId}/origin)
    @PostMapping("/{docsId}/origin")
    public ResponseEntity<OriginDocumentDto> postOriginDocs(
            @PathVariable Integer docsId,
            @RequestBody OriginDocumentDto originDocumentDto
    ) {
        // docsId를 DTO에 포함하여 처리
        OriginDocumentDto createdOriginDocument = docsService.createOriginDocument(
                new OriginDocumentDto(null, docsId, originDocumentDto.pOrder(),
                        originDocumentDto.tag(), originDocumentDto.content())
        );
        return ResponseEntity.ok(createdOriginDocument);
    }

    // ✅ 원본 문서(OriginDocument) 조회 (전체 조회 / 단락별 조회)
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

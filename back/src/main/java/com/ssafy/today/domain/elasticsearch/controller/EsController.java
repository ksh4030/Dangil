package com.ssafy.today.domain.elasticsearch.controller;

import com.ssafy.today.domain.elasticsearch.dto.request.*;
import com.ssafy.today.domain.elasticsearch.dto.response.SearchResponse;
import com.ssafy.today.domain.elasticsearch.dto.response.SearchResponseWrapper;
import com.ssafy.today.domain.elasticsearch.service.EsService;
import com.ssafy.today.util.response.SuccessCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.today.util.response.SuccessResponseEntity.getResponseEntity;

@RestController
@RequestMapping("/es")
@RequiredArgsConstructor
public class EsController {

    private final EsService esService;

    private static final String PASSWORD = "today!";

    @PostMapping("/save")
    public ResponseEntity<?> saveEs(@RequestBody DiaryEsRequest diaryEsRequest) {
        esService.saveEs(diaryEsRequest);
        return getResponseEntity(SuccessCode.OK);
    }

    @PatchMapping("/update/test")
    public ResponseEntity<?> updateTest(@RequestBody UpdateDiaryRequest updateDiaryRequest) {
        esService.update(updateDiaryRequest);

        return getResponseEntity(SuccessCode.OK);
    }

    @PostMapping("/search/test")
    public ResponseEntity<?> searchTest(@RequestBody SearchRequest searchRequest) {
        List<SearchResponse> searchRes = esService.search(searchRequest);
        SearchResponseWrapper responseWrapper = new SearchResponseWrapper(searchRes);
        return getResponseEntity(SuccessCode.OK, responseWrapper);
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(HttpServletRequest request, @RequestBody KeywordRequest keywordRequest) {
        Long memberId = (Long) request.getAttribute("memberId");
        List<SearchResponse> searchRes = esService.search(SearchRequest.builder()
                .keyword(keywordRequest.getKeyword())
                .memberId(memberId)
                .build());
        return getResponseEntity(SuccessCode.OK, searchRes);
    }

    @DeleteMapping("/delete/test")
    public ResponseEntity<?> deleteTest(HttpServletRequest request, @RequestBody DeleteRequest deleteRequest) {
        esService.delete(deleteRequest);
        return getResponseEntity(SuccessCode.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(HttpServletRequest request, @RequestBody Long diaryId) {
        Long memberId = (Long) request.getAttribute("memberId");
        esService.delete(DeleteRequest.builder()
                .memberId(memberId)
                .diaryId(diaryId)
                .build());
        return getResponseEntity(SuccessCode.OK);
    }

    @PostMapping("/init/es")
    public ResponseEntity<?> initEs(HttpServletRequest request) {
        esService.initEs();
        return getResponseEntity(SuccessCode.OK);
    }

    @DeleteMapping("/delete/es")
    public ResponseEntity<?> delete() {
        esService.deleteAll();
        return getResponseEntity(SuccessCode.OK);
    }
}

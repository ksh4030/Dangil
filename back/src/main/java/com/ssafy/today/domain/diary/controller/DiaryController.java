package com.ssafy.today.domain.diary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.today.domain.analysis.service.AnalysisService;
import com.ssafy.today.domain.diary.dto.request.*;
import com.ssafy.today.domain.diary.dto.response.DiaryResponse;
import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.entity.Feel;
import com.ssafy.today.domain.diary.service.DiaryService;
import com.ssafy.today.domain.elasticsearch.dto.request.DeleteRequest;
import com.ssafy.today.domain.elasticsearch.dto.request.DiaryEsRequest;
import com.ssafy.today.domain.elasticsearch.dto.request.UpdateDiaryRequest;
import com.ssafy.today.domain.elasticsearch.service.EsService;
import com.ssafy.today.domain.notice.service.NoticeService;
import com.ssafy.today.domain.tempimg.service.TempImgService;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.ErrorResponseEntity;
import com.ssafy.today.util.response.SuccessCode;
import com.ssafy.today.util.response.exception.GlobalException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static com.ssafy.today.util.response.SuccessResponseEntity.getResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/diary")
public class DiaryController {
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final DiaryService diaryService;
    private final EsService esService;
    private final AnalysisService analysisService;
    private final TempImgService tempImgService;
    private final NoticeService noticeService;
    @PostMapping
    public ResponseEntity<?> createDiary(HttpServletRequest request, @RequestBody DiaryContentRequest diaryContentRequest) {
        Long memberId = (Long) request.getAttribute("memberId");
        diaryContentRequest.setMemberId(memberId);
        // 개행 문자 제거
        diaryContentRequest.setContent(diaryContentRequest.getContent().replace("\n", " "));
        // 이미지를 제외한 diary 생성
        DiaryResponse diaryResponse = diaryService.createDiary(memberId, diaryContentRequest);
        // 임의 날짜 지정이 있을시 임의 지정한 값으로 설정
        if(diaryContentRequest.getCreatedAt() != null){
            diaryService.updateCreatedAt(diaryResponse.getId(), diaryContentRequest.getCreatedAt());
        }else{
            diaryContentRequest.setCreatedAt(diaryResponse.getCreatedAt());
        }
        diaryContentRequest.setDiaryId(diaryResponse.getId());
        diaryContentRequest.setCount(diaryResponse.getCount());
        // gpu 서버에 소켓통신을 통한 이미지 생성 요청 보내기
        kafkaTemplate.send("image-request", diaryContentRequest);
        System.out.println("Diary 생성 요청");

        return getResponseEntity(SuccessCode.OK, diaryResponse);
    }

    /**
     * fastapi 서버에서 이미지 생성이후 호출 될곳
     */
    @KafkaListener(topics = "image-created", groupId = "${kafka.group}")
    public void consumer(DiaryContentCreated diaryContentCreated) {
        System.out.println("Diary 생성 완료");
        // Analysis 에 저장, Diary 테이블에 저장, tempImg 테이블에 저장
        tempImgService.createTempImages(diaryContentCreated);
        analysisService.createOrUpdateAnalysis(diaryContentCreated.getMemberId(), diaryContentCreated);
        diaryService.updateAfterCreateImg(diaryContentCreated);


        // 클라이언트 알람 전송
        noticeService.completeNotice(diaryContentCreated.getDiaryId(), diaryContentCreated.getMemberId(), diaryContentCreated.getCount());
    }

    @PostMapping("/img")
    public ResponseEntity<?> updateImgUrl(HttpServletRequest request, @RequestBody DiaryImageRequest diaryRequest) {
        Long memberId = (Long) request.getAttribute("memberId");
        if(!diaryService.checkDiaryBelongsToMember(diaryRequest.getId(), memberId)){
            throw new GlobalException(ErrorCode.DIARY_OWNERSHIP_MISMATCH);
        }
        // 다이어리에 이미지 업데이트
        diaryService.updateDiaryImg(diaryRequest);
        tempImgService.deleteTempImg(diaryRequest.getId());
        // TODO : 임시미이지 s3 삭제

        //elasticsearch에 저장
        DiaryResponse diaryResponse = diaryService.getDiaryById(diaryRequest.getId());
        System.out.println(diaryResponse);
        esService.saveEs(DiaryEsRequest.fromDiaryResponse(diaryResponse));

        return getResponseEntity(SuccessCode.OK);
    }

    @PatchMapping("/{diaryId}")
    public ResponseEntity<?> updateDiary(HttpServletRequest request, @RequestBody DiaryUpdateRequest diaryUpdateRequest, @PathVariable("diaryId") Long diaryId) {
        diaryService.updateDiaryContent(diaryId, diaryUpdateRequest);
        Long memberId = (Long) request.getAttribute("memberId");

        //elasticsearch update
        esService.update(UpdateDiaryRequest.builder()
                .memberId(memberId)
                .diaryId(diaryId)
                .content(diaryUpdateRequest.getContent())
                .build());

        return getResponseEntity(SuccessCode.OK);
    }

    @DeleteMapping("/{diaryId}")
    public ResponseEntity<?> deleteDiary(HttpServletRequest request, @PathVariable("diaryId") Long diaryId) {
        Long memberId = (Long) request.getAttribute("memberId");
        Diary diary = diaryService.getDiaryEntity(diaryId);

        noticeService.deleteNotice(diaryId);
        analysisService.deleteOrSubtractAnalysis(diary);
        diaryService.deleteDiary(diaryId);
        //elasticsearch delete
        esService.delete(DeleteRequest.builder()
                .diaryId(diaryId)
                .memberId(memberId)
                .build());
        return getResponseEntity(SuccessCode.OK);

    }

    @GetMapping("/{diaryId}")
    public ResponseEntity<?> getDiary(@PathVariable("diaryId") Long diaryId) {
        DiaryResponse diaryResponse = diaryService.getDiaryById(diaryId);
        return getResponseEntity(SuccessCode.OK, diaryResponse);
    }

    @GetMapping
    public ResponseEntity<?> getDiaryList(HttpServletRequest request, Pageable pageable) {
        Long memberId = (Long) request.getAttribute("memberId");
        Page<DiaryResponse> diaryPage = diaryService.getDiaryPage(memberId, pageable);
        return getResponseEntity(SuccessCode.OK, diaryPage);
    }

    @PatchMapping("/important/{diaryId}")
    public ResponseEntity<?> updateImportant(HttpServletRequest request, @PathVariable("diaryId") Long diaryId) {
        Long memberId = (Long) request.getAttribute("memberId");
        // 해당 유저의 동일한 날짜의 중요일기 불러와서 서로 true, false 값 바꿔주기
        diaryService.updateImportantDiary(memberId, diaryId);

        return getResponseEntity(SuccessCode.OK);
    }

    @GetMapping("/img/{diaryId}")
    public ResponseEntity<?> getTempImg(@PathVariable("diaryId") Long diaryId){
        return getResponseEntity(SuccessCode.OK, tempImgService.getTempImg(diaryId));
    }


}

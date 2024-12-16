package com.ssafy.today.domain.notice.controller;

import com.ssafy.today.domain.notice.dto.request.NoticeUpdateRequest;
import com.ssafy.today.domain.notice.dto.request.PushMessageRequest;
import com.ssafy.today.domain.notice.dto.request.SaveTokenRequest;
import com.ssafy.today.domain.notice.dto.request.TokenRequest;
import com.ssafy.today.domain.notice.dto.response.NoticeResponse;
import com.ssafy.today.domain.notice.service.NoticeService;
import com.ssafy.today.domain.notice.service.PushMessageService;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.SuccessCode;
import com.ssafy.today.util.response.exception.GlobalException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;



import static com.ssafy.today.util.response.SuccessResponseEntity.getResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notices")
public class NoticeController {
    private final NoticeService noticeService;
    private final PushMessageService pushMessageService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    // 알림 리스트 랜더링
    @GetMapping
    public ResponseEntity<?> getNotices(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK,
                NoticeResponse.getNoticeResponses(noticeService.getNotices(memberId)));
    }

    // 알림 수정
    @PatchMapping
    public ResponseEntity<?> updateNoticeStatus(@Valid @RequestBody NoticeUpdateRequest noticeUpdateRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new GlobalException(ErrorCode.INVALID_INPUT_VALUE);
        }
        noticeService.updateNotice(noticeUpdateRequest);
        return getResponseEntity(SuccessCode.OK);
    }

    // 안읽은 알림 갯수 카운트
    @GetMapping("/cnt")
    public ResponseEntity<?> getNoticeCount(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        return getResponseEntity(SuccessCode.OK,
            noticeService.getNoticeCount(memberId));
    }

    @DeleteMapping("/{noticeId}")
    public ResponseEntity<?> deleteNotice(@PathVariable("noticeId") Long noticeId) {
        noticeService.deleteNoticeById(noticeId);
        return getResponseEntity(SuccessCode.OK);
    }


    @PostMapping("/push/test")
    public ResponseEntity<?> sendPushMessage(@RequestBody PushMessageRequest pushMessageRequest) {
        System.out.println(pushMessageRequest.toString());
//        pushMessageService.sendPushMessage(pushMessageRequest);
        return getResponseEntity(SuccessCode.OK);
    }



    @PostMapping("/token")
    public ResponseEntity<?> saveToken(HttpServletRequest request, @RequestBody TokenRequest tokenRequest) {
        logger.info("this is device token ======= " + tokenRequest.getDeviceToken());
        Long memberId = (Long) request.getAttribute("memberId");
        noticeService.saveToken(SaveTokenRequest.builder()
                .memberId(memberId)
                .deviceToken(tokenRequest.getDeviceToken().replace("\"", ""))
                .build());
        System.out.println("token 들어왔다");
        System.out.println(tokenRequest.getDeviceToken());
        return getResponseEntity(SuccessCode.OK);
    }
}
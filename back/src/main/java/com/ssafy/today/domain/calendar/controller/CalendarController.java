package com.ssafy.today.domain.calendar.controller;

import com.ssafy.today.domain.calendar.dto.response.CalendarResponse;
import com.ssafy.today.domain.calendar.service.CalendarService;
import com.ssafy.today.util.response.SuccessCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.today.util.response.SuccessResponseEntity.getResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/calendars")
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/{date}")
    public ResponseEntity<?> getDiariesMonth(HttpServletRequest request, @PathVariable("date") LocalDate date){
        Long memberId = (Long) request.getAttribute("memberId");
        // 해당 memberId의 한달간의 일기 정보 가져오기
        List<CalendarResponse> diaryList = calendarService.getDiaryMemberIdAndMonth(memberId, date);
        return getResponseEntity(SuccessCode.OK, diaryList);
    }

    @GetMapping("/day/{date}")
    public ResponseEntity<?> getDiariesDay(HttpServletRequest request, @PathVariable("date") LocalDate date){
        Long memberId = (Long) request.getAttribute("memberId");
        // 해당 memberId의 하루 동안의 일기 가져오기
        List<CalendarResponse> diaryList = calendarService.getDiaryMemberIdAndDay(memberId, date);

        return getResponseEntity(SuccessCode.OK, diaryList);
    }
}

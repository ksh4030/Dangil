package com.ssafy.today.domain.analysis.controller;

import com.ssafy.today.domain.analysis.dto.response.AnalysisResponse;
import com.ssafy.today.domain.analysis.service.AnalysisService;
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
@RequestMapping(value = "/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    @GetMapping("/{date}")
    public ResponseEntity<?> getAnalysisMonth(HttpServletRequest request, @PathVariable("date") LocalDate date){
        Long memberId = (Long) request.getAttribute("memberId");
        // 해당 memberId의 한달간의 통계 가져오기
        AnalysisResponse analysisResponse = analysisService.getAnalysisByMemberIdAndMonth(memberId, date);
        return getResponseEntity(SuccessCode.OK, analysisResponse);
    }

    @GetMapping("/day/{date}")
    public ResponseEntity<?> getAnalysisDay(HttpServletRequest request, @PathVariable("date") LocalDate date){
        Long memberId = (Long) request.getAttribute("memberId");
        // 해당 memberId의 하루 동안의 통계 가져오기
        AnalysisResponse analysisResponse = analysisService.getAnalysisByMemberIdAndDay(memberId, date);

        return getResponseEntity(SuccessCode.OK, analysisResponse);
    }
}

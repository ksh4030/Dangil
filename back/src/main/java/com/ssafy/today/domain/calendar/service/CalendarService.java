package com.ssafy.today.domain.calendar.service;

import com.ssafy.today.domain.calendar.dto.response.CalendarResponse;
import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.repository.DiaryRepository;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CalendarService {

    private final DiaryRepository diaryRepository;
    public List<CalendarResponse> getDiaryMemberIdAndDay(Long memberId, LocalDate day){
        LocalDateTime startOfDay = day.atStartOfDay();
        LocalDateTime endOfDay = day.atTime(LocalTime.MAX);

        List<Diary> diaries = diaryRepository.findAllByMemberIdAndCreatedAtBetweenOrderByIdDesc(memberId, startOfDay, endOfDay);
        if(diaries == null){
            throw new GlobalException(ErrorCode.ANALYSIS_NOT_FOUND);
        }
        return diaries.stream()
                .map(CalendarResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<CalendarResponse> getDiaryMemberIdAndMonth(Long memberId, LocalDate date) {
        // TODO : 해당유저의 해당 달에 해당하는 important 컬럼이 true 인 모든 다이어리 가져오기
        YearMonth yearMonth = YearMonth.from(date);
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atStartOfDay();
        System.out.println(startOfMonth);
        System.out.println(endOfMonth);
        List<Diary> diaries = diaryRepository.findByMemberIdAndImportantIsTrueAndCreatedAtBetween(memberId, startOfMonth, endOfMonth);
        if(diaries == null){
            throw new GlobalException(ErrorCode.ANALYSIS_NOT_FOUND);
        }
        return diaries.stream()
                .map(CalendarResponse::fromEntity)
                .collect(Collectors.toList());
    }
}

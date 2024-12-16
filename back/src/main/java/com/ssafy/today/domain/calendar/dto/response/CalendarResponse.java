package com.ssafy.today.domain.calendar.dto.response;


import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.entity.Feel;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CalendarResponse {
    private Long id;
    private Long memberId;
    private Boolean important;
    private String imgUrl;
    private String content;
    private Integer status;
    private Feel feel;
    private LocalDateTime createdAt;

    public static CalendarResponse fromEntity(Diary diary){
        CalendarResponse calendarResponse = CalendarResponse.builder()
                .id(diary.getId())
                .memberId(diary.getMember().getId())
                .important(diary.getImportant())
                .imgUrl(diary.getImgUrl())
                .content(diary.getContent())
                .status(diary.getStatus())
                .feel(diary.getFeel())
                .createdAt(diary.getCreatedAt())
                .build();

        return calendarResponse;
    }
}


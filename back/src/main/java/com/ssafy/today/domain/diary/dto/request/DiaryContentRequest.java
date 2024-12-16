package com.ssafy.today.domain.diary.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.today.domain.diary.dto.response.DiaryResponse;
import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.entity.Feel;
import com.ssafy.today.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Builder
public class DiaryContentRequest {

    private Long diaryId;

    private Long memberId;

    private Feel feel;

    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    private LocalDateTime createdAt;

    private Integer count;

    public static Diary toEntity(DiaryContentRequest diaryContentRequest, Member member, boolean importent,Integer count){
        return Diary.builder()
                .member(member)
                .feel(diaryContentRequest.getFeel())
                .content(diaryContentRequest.getContent())
                .important(importent)
                .status(0)
                .imgUrl(null)
                .count(count)
                .build();
    }
}

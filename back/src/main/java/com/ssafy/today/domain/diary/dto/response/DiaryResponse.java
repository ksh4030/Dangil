package com.ssafy.today.domain.diary.dto.response;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.entity.Feel;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class DiaryResponse {

    private Long id;
    private Long memberId;
    private Feel feel;
    private Boolean important;
    private String imgUrl;
    private String content;
    private Integer status;
    private LocalDateTime createdAt;
    private Integer count;

    public static DiaryResponse fromEntity(Diary diary){
        DiaryResponse diaryResponse = DiaryResponse.builder()
                .id(diary.getId())
                .memberId(diary.getMember().getId())
                .feel(diary.getFeel())
                .important(diary.getImportant())
                .imgUrl(diary.getImgUrl())
                .content(diary.getContent())
                .status(diary.getStatus())
                .createdAt(diary.getCreatedAt())
                .count(diary.getCount())
                .build();

        return diaryResponse;
    }
}

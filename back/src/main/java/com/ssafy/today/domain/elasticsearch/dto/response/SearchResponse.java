package com.ssafy.today.domain.elasticsearch.dto.response;

import com.ssafy.today.domain.elasticsearch.entity.DiaryEs;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class SearchResponse {
    private Long id;
    private String imgUrl;
    private LocalDateTime createdAt;
    private String content;

    @Builder
    public SearchResponse(Long id, String imgUrl, LocalDateTime createdAt, String content) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.createdAt = createdAt;
        this.content = content;
    }

    public static SearchResponse fromEntity(DiaryEs diaryEs) {
        return SearchResponse.builder()
                .content(diaryEs.getContent())
                .id(diaryEs.getDiaryId())
                .createdAt(diaryEs.getCreatedAt())
                .imgUrl(diaryEs.getImgUrl())
                .build();
    }
}

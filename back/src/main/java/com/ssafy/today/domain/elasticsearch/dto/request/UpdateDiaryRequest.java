package com.ssafy.today.domain.elasticsearch.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateDiaryRequest {
    private Long memberId;
    private Long diaryId;
    private String content;

    @Builder
    public UpdateDiaryRequest(Long memberId, Long diaryId, String content) {
        this.memberId = memberId;
        this.diaryId = diaryId;
        this.content = content;
    }
}

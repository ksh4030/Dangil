package com.ssafy.today.domain.elasticsearch.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DeleteRequest {
    private Long diaryId;
    private Long memberId;

    @Builder
    public DeleteRequest(Long diaryId, Long memberId) {
        this.diaryId = diaryId;
        this.memberId = memberId;
    }
}

package com.ssafy.today.domain.elasticsearch.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SearchRequest {
    private String keyword;
    private Long memberId;

    @Builder
    public SearchRequest(String keyword, Long memberId) {
        this.keyword = keyword;
        this.memberId = memberId;
    }
}

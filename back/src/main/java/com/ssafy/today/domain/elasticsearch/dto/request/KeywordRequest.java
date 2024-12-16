package com.ssafy.today.domain.elasticsearch.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KeywordRequest {
    private String keyword;

    @Builder
    public KeywordRequest(String keyword) {
        this.keyword = keyword;
    }
}

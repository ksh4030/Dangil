package com.ssafy.today.domain.notice.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TokenRequest {
    private String deviceToken;

    @Builder
    public TokenRequest(String deviceToken) {
        this.deviceToken = deviceToken;
    }
}
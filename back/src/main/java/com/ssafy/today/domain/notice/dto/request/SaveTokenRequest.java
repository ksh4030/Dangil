package com.ssafy.today.domain.notice.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SaveTokenRequest {
    private Long memberId;
    private String deviceToken;

    @Builder
    public SaveTokenRequest(Long memberId, String deviceToken) {
        this.memberId = memberId;
        this.deviceToken = deviceToken;
    }
}

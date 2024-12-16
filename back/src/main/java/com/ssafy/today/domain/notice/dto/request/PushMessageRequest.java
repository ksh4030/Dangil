package com.ssafy.today.domain.notice.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class PushMessageRequest {
    private String token;
    private String title;
    private String body;
    private Long diaryId;

    @Builder
    public PushMessageRequest(String token, String title, String body, Long diaryId) {
        this.token = token;
        this.title = title;
        this.body = body;
        this.diaryId = diaryId;
    }
}

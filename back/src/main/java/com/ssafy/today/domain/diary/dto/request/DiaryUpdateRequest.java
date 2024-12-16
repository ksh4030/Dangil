package com.ssafy.today.domain.diary.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryUpdateRequest {
    public String content;
}

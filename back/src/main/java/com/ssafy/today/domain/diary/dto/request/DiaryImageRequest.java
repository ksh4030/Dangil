package com.ssafy.today.domain.diary.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DiaryImageRequest {
    private Long id;
    private String imgUrl;

}

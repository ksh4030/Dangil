package com.ssafy.today.domain.notice.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NoticeUpdateRequest {
  @NotNull
  private Long noticeId;
  @NotNull
  private Boolean confirm;
}

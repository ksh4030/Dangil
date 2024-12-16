package com.ssafy.today.domain.notice.dto.response;

import com.ssafy.today.domain.notice.entity.Notice;
import com.ssafy.today.domain.notice.entity.NoticeKind;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NoticeResponse {
  private Long noticeId;
  private Long diaryId;
  private NoticeKind kind;
  private String content;
  private Boolean confirm;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  public static List<NoticeResponse> getNoticeResponses(List<Notice> notices) {
    List<NoticeResponse> noticeResponses = new ArrayList<>();
    for (Notice notice : notices) {
      noticeResponses.add(
          NoticeResponse.builder()
          .noticeId(notice.getId())
          .diaryId(notice.getDiary().getId())
          .kind(notice.getKind())
          .content(notice.getContent())
          .confirm(notice.getConfirm())
          .createdAt(notice.getCreatedAt())
          .updatedAt(notice.getUpdatedAt())
          .build()
      );
    }

    return noticeResponses;
  }
}

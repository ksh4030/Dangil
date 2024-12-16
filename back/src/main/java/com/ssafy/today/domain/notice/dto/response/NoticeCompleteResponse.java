package com.ssafy.today.domain.notice.dto.response;

import com.ssafy.today.domain.member.dto.response.MemberResponse;
import com.ssafy.today.domain.notice.entity.Notice;
import com.ssafy.today.domain.notice.entity.NoticeKind;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Builder
public class NoticeCompleteResponse {
    private Long noticeId;
    private Long diaryId;
    private NoticeKind kind;
    private String content;
    private Boolean confirm;

    @DateTimeFormat(pattern = "yyyy-mm-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    @DateTimeFormat(pattern = "yyyy-mm-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public static NoticeCompleteResponse getNoticeCompleteResponse(Notice notice) {
        return NoticeCompleteResponse.builder().
                noticeId(notice.getId()).
                diaryId(notice.getDiary().getId()).
                kind(notice.getKind()).
                content(notice.getContent()).
                confirm(notice.getConfirm()).
                createdAt(notice.getCreatedAt()).
                updatedAt(notice.getUpdatedAt())
                .build();
    }
}

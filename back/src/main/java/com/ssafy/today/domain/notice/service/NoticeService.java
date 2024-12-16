package com.ssafy.today.domain.notice.service;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.repository.DiaryRepository;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.member.repository.MemberRepository;
import com.ssafy.today.domain.notice.dto.request.NoticeUpdateRequest;
import com.ssafy.today.domain.notice.dto.request.PushMessageRequest;
import com.ssafy.today.domain.notice.dto.request.SaveTokenRequest;
import com.ssafy.today.domain.notice.dto.response.NoticeCompleteResponse;
import com.ssafy.today.domain.notice.entity.Notice;
import com.ssafy.today.domain.notice.entity.Notice.NoticeBuilder;
import com.ssafy.today.domain.notice.entity.NoticeKind;
import com.ssafy.today.domain.notice.repository.NoticeRepository;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.exception.GlobalException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {
  private final MemberRepository memberRepository;
  private final DiaryRepository diaryRepository;
  private final NoticeRepository noticeRepository;

  private final PushMessageService pushMessageService;

  // 모든 알림 가져 오기
  public List<Notice> getNotices(Long memberId) {
    Member member = memberRepository.getReferenceById(memberId);
    return noticeRepository.findAllByMemberOrderByCreatedAtDesc(member);
  }

  // 읽음 or 안읽음 처리
  public void updateNotice(NoticeUpdateRequest noticeUpdateRequest) {
    // 객체 조회 및 널 체크
    Notice notice = noticeRepository.findById(noticeUpdateRequest.getNoticeId()).orElseThrow(
        () -> new GlobalException(ErrorCode.NOTICE_NOT_FOUND));

    // 더티 체킹
    Notice.changeStatus(notice, noticeUpdateRequest.getConfirm());
  }

  public Long getNoticeCount(Long memberId) {
    Member member = memberRepository.getReferenceById(memberId);
    return noticeRepository.countAllByMemberAndConfirmIsTrue(member);
  }

  public void deleteNoticeById (Long noticeId) {
    Notice notice = noticeRepository.getReferenceById(noticeId);
    noticeRepository.delete(notice);
  }

  // 파이썬 서버 이미지 로드 완료 알림 and 알림 DB 저장
  public void completeNotice(Long diaryId, Long memberId, Integer sequence) {
    Member member = memberRepository.getReferenceById(memberId);
    Diary diary = diaryRepository.getReferenceById(diaryId);

    // DB 저장
    Notice notice = Notice.builder()
        .diary(diary)
        .member(member)
        .kind(NoticeKind.COMPLETE)
        .content(sequence.toString())
        .confirm(false).build();
    noticeRepository.save(notice);

    NoticeCompleteResponse noticeCompleteResponse = NoticeCompleteResponse.getNoticeCompleteResponse(noticeRepository.findByDiaryAndKind(diary, NoticeKind.COMPLETE));

    // 알림
    pushMessageService.sendPushMessage(
            PushMessageRequest.builder()
                    .token(member.getDeviceToken())
                    .title("그림 생성 완료")
                    .body(sequence.toString() + "번째 일기에 대한 그림이 생성되었습니다.")
                    .diaryId(diaryId)
                    .build(),
            noticeCompleteResponse
    );
  }


  // 일기 안씀 로드 처리
  public void saveToken(SaveTokenRequest saveTokenRequest) {
    Member member = memberRepository.getReferenceById(saveTokenRequest.getMemberId());
    member.updateToken(saveTokenRequest.getDeviceToken());
  }

  //일기 삭제시 알람 삭제
  public void deleteNotice(Long diaryId){
    Diary diary = diaryRepository.findById(diaryId).orElseThrow(
            () -> new GlobalException(ErrorCode.DIARY_NOT_FOUND));
    noticeRepository.deleteByDiary(diary);
  }


}

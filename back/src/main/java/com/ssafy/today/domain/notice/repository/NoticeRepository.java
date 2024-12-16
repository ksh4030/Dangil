package com.ssafy.today.domain.notice.repository;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.notice.entity.Notice;
import java.util.List;

import com.ssafy.today.domain.notice.entity.NoticeKind;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
  List<Notice> findAllByMemberOrderByCreatedAtDesc(Member member);

  Long countAllByMemberAndConfirmIsTrue(Member member);

  Notice findByDiaryAndKind(Diary diary, NoticeKind kind);

  void deleteByDiary(Diary diary);

}

package com.ssafy.today.domain.notice.entity;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"member"})
public class Notice extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "notice_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "diary_id")
  private Diary diary;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @Enumerated(EnumType.STRING)
  private NoticeKind kind;

  private String content;

  private Boolean confirm;

  @Builder
  public Notice(Diary diary, Member member, NoticeKind kind, String content, Boolean confirm) {
    this.diary = diary;
    this.member = member;
    this.kind = kind;
    this.content = content;
    this.confirm = confirm;
  }

  public static void changeStatus(Notice notice, Boolean confirm) {
    notice.confirm = confirm;
  }
}

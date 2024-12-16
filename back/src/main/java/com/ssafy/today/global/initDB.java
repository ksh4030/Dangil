package com.ssafy.today.global;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.member.entity.Member;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.ssafy.today.domain.diary.entity.Feel.*;

@Component
@RequiredArgsConstructor
public class initDB {

  private final InitService initService;

  @PostConstruct
  public void init() {
//       initService.dbInit1();
  }

  @Component
  @Transactional
  @RequiredArgsConstructor
  static class InitService {

    private final EntityManager em;

    public void dbInit1() {
      String lolem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

      Member member1 = Member.builder()
              .email("tjdgus4560@naver.com")
              .nickname("한성현")
              .build();
      em.persist(member1);
      Member member2 = Member.builder()
              .email("tjdgus4563@naver.com")
              .nickname("한성현2")
              .build();
      em.persist(member2);

      Diary diary1 = Diary.builder()
              .member(member1)
              .content(lolem)
              .imgUrl("https://mimgnews.pstatic.net/image/origin/001/2024/04/25/14651374.jpg?type=nf220_150")
              .feel(SURPRISE) // 예시로 번갈아 가면서 감정 설정
              .important(true)
              .build();
      em.persist(diary1);

      for (int i = 0 ; i < 10 ; i ++) {
        Diary diary = Diary.builder()
                .member(member1)
                .content(lolem)
                .imgUrl("https://mimgnews.pstatic.net/image/origin/001/2024/04/25/14651374.jpg?type=nf220_150")
                .feel(i % 2 == 0 ? ANGRY : SURPRISE) // 예시로 번갈아 가면서 감정 설정
                .important(false)
                .build();
        em.persist(diary);
      }
      for (int i = 0 ; i < 10 ; i ++) {
        Diary diary = Diary.builder()
                .member(member2)
                .content(lolem)
                .imgUrl("https://mimgnews.pstatic.net/image/origin/001/2024/04/25/14651374.jpg?type=nf220_150")
                .feel(i % 2 == 0 ? ANGRY : SURPRISE) // 예시로 번갈아 가면서 감정 설정
                .important(false) // 예시로 중요 여부를 번갈아 가면서 설정
                .build();
        em.persist(diary);
      }


    }

    // 테스트 init

  }
}

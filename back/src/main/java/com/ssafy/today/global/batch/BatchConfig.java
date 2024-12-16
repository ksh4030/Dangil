package com.ssafy.today.global.batch;


import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.member.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.today.domain.notice.dto.request.PushMessageRequest;
import com.ssafy.today.domain.notice.service.PushMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
@Slf4j
@Configuration
@RequiredArgsConstructor
public class BatchConfig {
    private final MemberRepository memberRepository;
    private final PushMessageService pushMessageService;
    @Bean
    public Job Job1(JobRepository jobRepository, Step Step1) {
        return new JobBuilder("Job1", jobRepository)
                .start(Step1)
                .build();
    }
    @Bean
    public Step Step1(JobRepository jobRepository, Tasklet Tasklet, PlatformTransactionManager platformTransactionManager){
        return new StepBuilder("Step1", jobRepository)
                .tasklet(Tasklet, platformTransactionManager).build();
    }
    @Bean
    public Tasklet Tasklet() {
        return ((contribution, chunkContext) -> {
            log.info("Job1 시작한다 ~");
            // 금일 일기를 작성하지 않은 멤버들을 뽑아온다.
            List<Member> members = memberRepository.findYetWrite();

            // 알림을 호출한다.
            List<PushMessageRequest> pushMessageRequestList = new ArrayList<>();
            int cnt = 0;
            for (Member member : members) {
                cnt++;
                pushMessageRequestList.add(
                        PushMessageRequest.builder()
                                .token(member.getDeviceToken())
                                .title("당일의 일기는 아직 인가요?")
                                .body("오늘의 일기를 작성해보세요")
                                .diaryId(0L)
                                .build()
                );
                // 100 명씩 끊어서 보낸다
                if ((cnt % 100) == 0) {
                    cnt = 0;
                    pushMessageService.sendPushMessageBulk(pushMessageRequestList);
                    pushMessageRequestList = new ArrayList<>();
                    Thread.sleep(10000);
                }
            }
            // 남은 member 들의 알림을 보낸다
            pushMessageService.sendPushMessageBulk(pushMessageRequestList);
            return RepeatStatus.FINISHED;
        });
    }
}

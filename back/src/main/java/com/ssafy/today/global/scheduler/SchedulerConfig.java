package com.ssafy.today.global.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
@EnableScheduling
public class SchedulerConfig {
  private final JobLauncher jobLauncher;
  // @Qualifier("Job1")
  // Qualifier 생략하는 방법
  // You may use spring trick to qualify field by naming it with desired qualifier without @Qualifier annotation.
  private final Job job1;

//  @Scheduled(fixedRate = 100000)
  @Scheduled(cron = "0 0 20 * * ?")
  public void findYetUser() {
    log.info("스케줄러 실행한다 ~");
    try {
      JobParameters params = new JobParametersBuilder()
              .addLong("time", System.currentTimeMillis(), true)
              .toJobParameters();
      // 만든 파라미터와 잡을 지정한다
      jobLauncher.run(job1, params);
    } catch (Exception e) {
      log.error("배치 작업 실행 중 에러 ~", e);
    }
  }
}

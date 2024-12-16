package com.ssafy.today.domain.analysis.repository;

import com.ssafy.today.domain.analysis.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
    /**
     * 하루동안에 다른 통계가 생성되었는지 판별
     * @param memberId
     * @param startDate
     * @param endDate
     * @return
     */
    boolean existsByMemberIdAndDiaryDateBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);

    /**
     * 특정 일 의 통계 하나 추출
     * @param memberId
     * @param startDate
     * @param endDate
     * @return
     */
    Analysis findFirstByMemberIdAndDiaryDateBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);

    /**
     * 일정 기간 동안의 통계List 추출
     * @param memberId
     * @param startDate
     * @param endDate
     * @return
     */
    List<Analysis> findByMemberIdAndDiaryDateBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);

}

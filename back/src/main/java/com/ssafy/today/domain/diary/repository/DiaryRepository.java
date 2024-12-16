package com.ssafy.today.domain.diary.repository;

import com.ssafy.today.domain.diary.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    Page<Diary> findAllByMemberId(Long memberId, Pageable pageable);
    // 하루동안의 다이어리 불러오기
    List<Diary> findAllByMemberIdAndCreatedAtBetweenOrderByIdDesc(Long memberId, LocalDateTime startOfDay, LocalDateTime endOfDay);

    List<Diary> findByMemberIdAndImportantIsTrueAndCreatedAtBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
    Diary findFirstByMemberIdAndCreatedAtBetweenAndImportant(Long memberId, LocalDateTime createdAt, LocalDateTime createdAt2, Boolean important);
    boolean existsByImportantIsTrueAndMemberIdAndCreatedAtBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
    boolean existsByIdAndMemberId(Long diaryId, Long memberId);
    int countByMemberIdAndCreatedAtBetween(Long memberId, LocalDateTime startOfDay, LocalDateTime endOfDay);
}

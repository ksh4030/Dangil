package com.ssafy.today.domain.tempimg.repository;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.tempimg.entity.TempImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TempImgRepository extends JpaRepository<TempImg, Long> {

    boolean existsByDiary(Diary diary);

    Optional<TempImg> findByDiary(Diary diary);

    void deleteByDiary(Diary diary);

}

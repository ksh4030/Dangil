package com.ssafy.today.domain.elasticsearch.repository;

import com.ssafy.today.domain.elasticsearch.entity.DiaryEs;
import java.util.Optional;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;


public interface EsRepository extends ElasticsearchRepository<DiaryEs, String> {
    List<DiaryEs> findAllByMemberIdAndContentContaining(Long memberId, String keyword);
    DiaryEs findByMemberIdAndDiaryId(Long memberId, Long diaryId);
    void deleteByMemberIdAndDiaryId(Long memberId, Long diaryId);
    void deleteAll();

    Optional<DiaryEs> findByDiaryId(Long diaryId);
//    DiaryEs deleteByMemberIdAndDiaryId(Long memberId, Long diaryId);
}

package com.ssafy.today.domain.elasticsearch.service;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.repository.DiaryRepository;
import com.ssafy.today.domain.elasticsearch.dto.request.DeleteRequest;
import com.ssafy.today.domain.elasticsearch.dto.request.DiaryEsRequest;
import com.ssafy.today.domain.elasticsearch.dto.request.SearchRequest;
import com.ssafy.today.domain.elasticsearch.dto.request.UpdateDiaryRequest;
import com.ssafy.today.domain.elasticsearch.dto.response.SearchResponse;
import com.ssafy.today.domain.elasticsearch.entity.DiaryEs;
import com.ssafy.today.domain.elasticsearch.repository.EsRepository;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.exception.GlobalException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EsService {

    private final EsRepository esRepository;
    private final DiaryRepository diaryRepository;

    public void saveEs(DiaryEsRequest diaryEsRequest) {
        Optional<DiaryEs> diaryEs = esRepository.findByDiaryId(diaryEsRequest.getDiaryId());
        if(diaryEs.isEmpty()) {
            esRepository.save(DiaryEs.builder()
                .content(diaryEsRequest.getContent())
                .memberId(diaryEsRequest.getMemberId())
                .diaryId(diaryEsRequest.getDiaryId())
                .imgUrl(diaryEsRequest.getImgUrl())
                .createdAt(diaryEsRequest.getCreatedAt())
                .build());
        }
    }

    public void update(UpdateDiaryRequest updateDiaryRequest) {
        DiaryEs diaryEs = esRepository.findByMemberIdAndDiaryId(updateDiaryRequest.getMemberId(), updateDiaryRequest.getDiaryId());
        esRepository.deleteByMemberIdAndDiaryId(updateDiaryRequest.getMemberId(), updateDiaryRequest.getDiaryId());
        saveEs(DiaryEsRequest.builder()
                .content(updateDiaryRequest.getContent())
                .memberId(diaryEs.getMemberId())
                .diaryId(diaryEs.getDiaryId())
                .imgUrl(diaryEs.getImgUrl())
                .createdAt(diaryEs.getCreatedAt())
                .build());
    }

    public List<SearchResponse> search(SearchRequest searchRequest) {
        List<DiaryEs> diaryEsList = esRepository.findAllByMemberIdAndContentContaining(searchRequest.getMemberId(), searchRequest.getKeyword());
        List<SearchResponse> searchRes = new ArrayList<>();

        for (DiaryEs de : diaryEsList) {
            searchRes.add(SearchResponse.fromEntity(de));
        }

        return searchRes;
    }

    public void delete(DeleteRequest deleteRequest) {
        esRepository.deleteByMemberIdAndDiaryId(deleteRequest.getMemberId(), deleteRequest.getDiaryId());
    }

    public void initEs() {
        esRepository.deleteAll();
        List<Diary> diaries = diaryRepository.findAll();
        List<DiaryEs> diaryEs = new ArrayList<>();

        for (Diary diary : diaries) {
            diaryEs.add(DiaryEs.builder()
                    .content(diary.getContent())
                    .memberId(diary.getMember().getId())
                    .diaryId(diary.getId())
                    .imgUrl(diary.getImgUrl())
                    .createdAt(diary.getCreatedAt())
                    .build());
        }
        esRepository.saveAll(diaryEs);
    }

    public void deleteAll() {
        esRepository.deleteAll();
    }

}

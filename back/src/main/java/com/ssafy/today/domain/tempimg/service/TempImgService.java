package com.ssafy.today.domain.tempimg.service;

import com.ssafy.today.domain.diary.dto.request.DiaryContentCreated;
import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.repository.DiaryRepository;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.member.repository.MemberRepository;
import com.ssafy.today.domain.tempimg.dto.response.TempImgResponse;
import com.ssafy.today.domain.tempimg.entity.TempImg;
import com.ssafy.today.domain.tempimg.repository.TempImgRepository;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TempImgService {

    private final TempImgRepository tempImgRepository;
    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;

    /**
     * fastapi 로부터 수신후 임시 이미지 저장
     * @param diaryContentCreated
     */
    public void createTempImages(DiaryContentCreated diaryContentCreated){
        Member member = memberRepository.findById(diaryContentCreated.getMemberId()).orElseThrow(
                () -> new GlobalException(ErrorCode.MEMBER_NOT_FOUND));

        Diary diary = diaryRepository.findById(diaryContentCreated.getDiaryId()).orElseThrow(
                () -> new GlobalException(ErrorCode.DIARY_NOT_FOUND));
        if(tempImgRepository.existsByDiary(diary)){
            throw new GlobalException(ErrorCode.TEMPIMAGE_ALREADY_EXISTS);
        }
        tempImgRepository.save(diaryContentCreated.toTempImgEntity(diary, member));
    }

    public TempImgResponse getTempImg(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(
                () -> new GlobalException(ErrorCode.DIARY_NOT_FOUND));
        TempImg tempImg = tempImgRepository.findByDiary(diary).orElseThrow(
                () -> new GlobalException(ErrorCode.TEMPIMAGE_NOT_FOUND));

        return TempImgResponse.fromEntity(tempImg);
    }

    public void deleteTempImg(Long diaryId){
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(
                () -> new GlobalException(ErrorCode.DIARY_NOT_FOUND));
        tempImgRepository.deleteByDiary(diary);
    }
}

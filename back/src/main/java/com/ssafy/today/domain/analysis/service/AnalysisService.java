package com.ssafy.today.domain.analysis.service;

import com.ssafy.today.domain.analysis.dto.response.AnalysisResponse;
import com.ssafy.today.domain.analysis.entity.Analysis;
import com.ssafy.today.domain.analysis.repository.AnalysisRepository;
import com.ssafy.today.domain.diary.dto.request.DiaryContentCreated;
import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.diary.repository.DiaryRepository;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.member.repository.MemberRepository;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AnalysisService {

    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;
    private final AnalysisRepository analysisRepository;

    /**
     * 한달 동안의 통계 처리
     * @param memberId
     * @param date
     * @return
     */
    public AnalysisResponse getAnalysisByMemberIdAndMonth(Long memberId, LocalDate date) {
        YearMonth yearMonth = YearMonth.from(date);
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atStartOfDay();
        List<Analysis> analysisList = analysisRepository.findByMemberIdAndDiaryDateBetween(memberId, startOfMonth, endOfMonth);
        return analysisConvertFromEntitys(analysisList);
    }

    /**
     * 하루 동안의 통계 처리
     * @param memberId
     * @param date
     * @return
     */
    public AnalysisResponse getAnalysisByMemberIdAndDay(Long memberId, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        Analysis analysis = analysisRepository.findFirstByMemberIdAndDiaryDateBetween(memberId, startOfDay, endOfDay);
        return analysisConvertFromEntity(analysis);
    }

    /**
     * 한달 동안의 통계 변환
     * @param analysisList
     * @return
     */
    private AnalysisResponse analysisConvertFromEntitys(List<Analysis> analysisList){

        if (analysisList.isEmpty()) {
            return null; // 또는 기본값 으로 채워진 AnalysisResponse 반환
        }
        int totalCount = analysisList.stream().mapToInt(Analysis::getCount).sum();

        // MBTI 카운트 합계
        int totalE = analysisList.stream().mapToInt(Analysis::getE).sum();
        int totalI = analysisList.stream().mapToInt(Analysis::getI).sum();
        int totalS = analysisList.stream().mapToInt(Analysis::getS).sum();
        int totalN = analysisList.stream().mapToInt(Analysis::getN).sum();
        int totalT = analysisList.stream().mapToInt(Analysis::getT).sum();
        int totalF = analysisList.stream().mapToInt(Analysis::getF).sum();
        int totalP = analysisList.stream().mapToInt(Analysis::getP).sum();
        int totalJ = analysisList.stream().mapToInt(Analysis::getJ).sum();

        // 감정 점수 합계
        double totalAngry = analysisList.stream().mapToDouble(Analysis::getAngry).sum();
        double totalDisgust = analysisList.stream().mapToDouble(Analysis::getDisgust).sum();
        double totalFear = analysisList.stream().mapToDouble(Analysis::getFear).sum();
        double totalHappiness = analysisList.stream().mapToDouble(Analysis::getHappiness).sum();
        double totalSadness = analysisList.stream().mapToDouble(Analysis::getSadness).sum();
        double totalSurprise = analysisList.stream().mapToDouble(Analysis::getSurprise).sum();

        // 감정 점수 평균 계산
        double avgAngry = totalAngry / totalCount;
        double avgDisgust = totalDisgust / totalCount;
        double avgFear = totalFear / totalCount;
        double avgHappiness = totalHappiness / totalCount;
        double avgSadness = totalSadness / totalCount;
        double avgSurprise = totalSurprise / totalCount;

        // AnalysisResponse 객체 생성 및 반환
        return AnalysisResponse.builder()
                .e(totalE)
                .i(totalI)
                .s(totalS)
                .n(totalN)
                .t(totalT)
                .f(totalF)
                .p(totalP)
                .j(totalJ)
                .angry(avgAngry)
                .disgust(avgDisgust)
                .fear(avgFear)
                .happiness(avgHappiness)
                .sadness(avgSadness)
                .surprise(avgSurprise)
                .build();
    }

    /**
     * 하루 동안의 통계 변환
     * @param analysis
     * @return
     */
    private AnalysisResponse analysisConvertFromEntity(Analysis analysis){
        List<Analysis> analysisList = Collections.singletonList(analysis);
        return analysisConvertFromEntitys(analysisList);
    }

    /**
     * 통계 튜플 생성 또는 업데이트
     * @param memberId
     * @param diaryContentCreated
     */
    public void createOrUpdateAnalysis(Long memberId, DiaryContentCreated diaryContentCreated){
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new GlobalException(ErrorCode.MEMBER_NOT_FOUND));

        LocalDate today = diaryContentCreated.getCreatedAt().toLocalDate();
        LocalDateTime startOfDay = LocalDateTime.of(today, LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(today, LocalTime.MAX);

        if(analysisRepository.existsByMemberIdAndDiaryDateBetween(memberId, startOfDay, endOfDay)){
            // 만약 있다면 기존의 통계에 값 업데이트
            Analysis analysis = analysisRepository.findFirstByMemberIdAndDiaryDateBetween(memberId, startOfDay, endOfDay);
            for (char c : diaryContentCreated.getMbti().toCharArray()) {
                // 값에따른 값 증가
                analysis.increaseType(c);
            }
            analysis.sumEmotions(
                    diaryContentCreated.getAngry(),
                    diaryContentCreated.getDisgust(),
                    diaryContentCreated.getFear(),
                    diaryContentCreated.getHappiness(),
                    diaryContentCreated.getSadness(),
                    diaryContentCreated.getSurprise()
            );
            analysis.increaseCount();
        }else{
            // 새로운 통계 생성
            Integer e = 0, i = 0, s = 0, n = 0, f = 0, t = 0, p = 0, j = 0;
            for (char c : diaryContentCreated.getMbti().toUpperCase().toCharArray()) {
                switch (c) {
                    case 'E': e++; break;
                    case 'I': i++; break;
                    case 'S': s++; break;
                    case 'N': n++; break;
                    case 'F': f++; break;
                    case 'T': t++; break;
                    case 'P': p++; break;
                    case 'J': j++; break;
                }
            }
            Analysis analysis = Analysis.builder()
                    .member(member)
                    .count(1)
                    .e(e)
                    .i(i)
                    .s(s)
                    .n(n)
                    .f(f)
                    .t(t)
                    .p(p)
                    .j(j)
                    .angry(diaryContentCreated.getAngry())
                    .disgust(diaryContentCreated.getDisgust())
                    .fear(diaryContentCreated.getFear())
                    .happiness(diaryContentCreated.getHappiness())
                    .sadness(diaryContentCreated.getSadness())
                    .surprise(diaryContentCreated.getSurprise())
                    .diaryDate(diaryContentCreated.getCreatedAt())
                    .build();
            analysisRepository.save(analysis);
        }

    }

    public void deleteOrSubtractAnalysis(Diary diary) {

        LocalDate date = diary.getCreatedAt().toLocalDate();
        LocalDateTime startOfDay = LocalDateTime.of(date, LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(date, LocalTime.MAX);

        Analysis analysis = analysisRepository.findFirstByMemberIdAndDiaryDateBetween(diary.getMember().getId(), startOfDay, endOfDay);
        if (analysis == null) { return ; }

        if(analysis.getCount() == 1){
            analysisRepository.deleteById(analysis.getId());
        }else{
            for (char c : diary.getMbti().toString().toCharArray()) {
                // 값에따른 값 감소
                analysis.decreaseType(c);
            }
            analysis.subtractEmotions(
                    diary.getAngry(),
                    diary.getDisgust(),
                    diary.getFear(),
                    diary.getHappiness(),
                    diary.getSadness(),
                    diary.getSurprise()
            );
            analysis.decreaseCount();
        }
    }
}

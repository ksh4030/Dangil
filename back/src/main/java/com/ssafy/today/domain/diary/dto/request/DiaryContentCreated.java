package com.ssafy.today.domain.diary.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.tempimg.entity.TempImg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryContentCreated {
    private Long memberId;
    private Long diaryId;
    private LocalDateTime createdAt;
    private List<String> imageUrl;
    private double angry;
    private double disgust;
    private double fear;
    private double happiness;
    private double sadness;
    private double surprise;
    private String mbti;
    private Integer count;

    public TempImg toTempImgEntity(Diary diary, Member member) {
        return TempImg.builder()
                .diary(diary)
                .member(member)
                .img1(imageUrl.size() > 0 ? imageUrl.get(0) : null)
                .img2(imageUrl.size() > 1 ? imageUrl.get(1) : null)
                .img3(imageUrl.size() > 2 ? imageUrl.get(2) : null)
                .img4(imageUrl.size() > 3 ? imageUrl.get(3) : null)
                .build();
    }

}

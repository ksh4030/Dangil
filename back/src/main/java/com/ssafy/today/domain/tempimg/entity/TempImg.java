package com.ssafy.today.domain.tempimg.entity;

import com.ssafy.today.domain.diary.entity.Diary;
import com.ssafy.today.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class TempImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "temp_img_id")
    private Long Id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String img1;

    private String img2;

    private String img3;

    private String img4;

    @Builder
    public TempImg(Diary diary, Member member, String img1, String img2, String img3, String img4) {
        this.diary = diary;
        this.member = member;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.img4 = img4;
    }


}

package com.ssafy.today.domain.analysis.entity;

import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"member"})
public class Analysis extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "analysis_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ColumnDefault("1")
    private Integer count;

    @ColumnDefault("0")
    private Integer e;

    @ColumnDefault("0")
    private Integer i;

    @ColumnDefault("0")
    private Integer s;

    @ColumnDefault("0")
    private Integer n;

    @ColumnDefault("0")
    private Integer f;

    @ColumnDefault("0")
    private Integer t;

    @ColumnDefault("0")
    private Integer p;

    @ColumnDefault("0")
    private Integer j;

    @ColumnDefault("0")
    private Double angry;

    @ColumnDefault("0")
    private Double disgust;

    @ColumnDefault("0")
    private Double fear;

    @ColumnDefault("0")
    private Double happiness;

    @ColumnDefault("0")
    private Double sadness;

    @ColumnDefault("0")
    private Double surprise;

    private LocalDateTime diaryDate;

    @Builder
    public Analysis(Member member, Integer count, Integer e, Integer i, Integer s, Integer n, Integer f, Integer t, Integer p, Integer j, Double angry, Double disgust, Double fear, Double happiness, Double sadness, Double surprise, LocalDateTime diaryDate) {
        this.member = member;
        this.count = count;
        this.e = e;
        this.i = i;
        this.s = s;
        this.n = n;
        this.f = f;
        this.t = t;
        this.p = p;
        this.j = j;
        this.angry = angry;
        this.disgust = disgust;
        this.fear = fear;
        this.happiness = happiness;
        this.sadness = sadness;
        this.surprise = surprise;
        this.diaryDate = diaryDate;
    }
    public void increaseCount(){
        this.count++;
    }

    public void increaseType(char type){
        switch (type) {
            case 'E':
                this.e++;
                break;
            case 'I':
                this.i++;
                break;
            case 'S':
                this.s++;
                break;
            case 'N':
                this.n++;
                break;
            case 'F':
                this.f++;
                break;
            case 'T':
                this.t++;
                break;
            case 'P':
                this.p++;
                break;
            case 'J':
                this.j++;
                break;
            default:
                System.out.println("잘못된 MBTI 타입입니다: " + type);
                break;
        }
    }

    public void decreaseType(char type){
        switch (type) {
            case 'E':
                this.e--;
                break;
            case 'I':
                this.i--;
                break;
            case 'S':
                this.s--;
                break;
            case 'N':
                this.n--;
                break;
            case 'F':
                this.f--;
                break;
            case 'T':
                this.t--;
                break;
            case 'P':
                this.p--;
                break;
            case 'J':
                this.j--;
                break;
            default:
                System.out.println("잘못된 MBTI 타입입니다: " + type);
                break;
        }
    }

    public void decreaseCount(){
        this.count--;
    }

    public void sumEmotions(Double angry, Double disgust, Double fear, Double happiness, Double sadness, Double surprise){
        this.angry+=angry;
        this.disgust+=disgust;
        this.fear+=fear;
        this.happiness+=happiness;
        this.sadness+=sadness;
        this.surprise+=surprise;
    }

    public void subtractEmotions(Double angry, Double disgust, Double fear, Double happiness, Double sadness, Double surprise){
        this.angry-=angry;
        this.disgust-=disgust;
        this.fear-=fear;
        this.happiness-=happiness;
        this.sadness-=sadness;
        this.surprise-=surprise;
    }

}

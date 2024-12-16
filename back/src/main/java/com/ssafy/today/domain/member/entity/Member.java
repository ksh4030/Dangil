package com.ssafy.today.domain.member.entity;

import com.ssafy.today.domain.member.dto.response.MemberResponse;
import com.ssafy.today.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String nickname;

    @Column(unique = true)
    private String email;

    @Column(name = "device_token")
    private String deviceToken;

    @Builder
    public Member(String nickname, String email, String deviceToken) {
        this.nickname = nickname;
        this.email = email;
        this.deviceToken = deviceToken;
    }

    public void updateToken(String deviceToken) {
        this.deviceToken = deviceToken;
    }
}

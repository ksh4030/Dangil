package com.ssafy.today.domain.member.dto.response;

import com.ssafy.today.domain.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponse {

    private Long id;

    private String email;

    private String nickName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String deviceToken;

    public static MemberResponse fromEntity(Member memberEntity){
        MemberResponse memberResponse = MemberResponse.builder()
                .id(memberEntity.getId())
                .email(memberEntity.getEmail())
                .nickName(memberEntity.getNickname())
                .createdAt(memberEntity.getCreatedAt())
                .updatedAt(memberEntity.getUpdatedAt())
                .deviceToken(memberEntity.getDeviceToken())
                .build();
        return memberResponse;
    }

}

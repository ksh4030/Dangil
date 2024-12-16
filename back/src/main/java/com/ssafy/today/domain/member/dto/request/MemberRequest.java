package com.ssafy.today.domain.member.dto.request;

import com.ssafy.today.domain.member.entity.Member;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
public class MemberRequest {

    private String nickname;

    private String email;

    public Member toEntity(){
        return Member.builder()
                .email(this.email)
                .nickname(this.nickname)
                .build();
    }
}

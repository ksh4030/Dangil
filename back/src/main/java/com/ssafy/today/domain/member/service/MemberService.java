package com.ssafy.today.domain.member.service;

import com.ssafy.today.domain.member.dto.request.MemberRequest;
import com.ssafy.today.domain.member.dto.response.MemberResponse;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.member.repository.MemberRepository;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.exception.GlobalException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberResponse getMember(Long id) {
        Member memberEntity =  memberRepository.findById(id).orElseThrow(
                () -> new GlobalException(ErrorCode.MEMBER_NOT_FOUND));
        MemberResponse memberResponse = MemberResponse.fromEntity(memberEntity);
        return memberResponse;
    }
    public Member createMember(MemberRequest memberRequest){
        Member member = memberRequest.toEntity();
        memberRepository.save(member);
        return member;
    }

//    public Member updateMember(Long id, MemberRequest memberRequest){
//        Optional<Member> member = memberRepository.findById(id);
//
//        memberRepository.(member);
//        return member;
//    }

    public boolean isMemberExists(String email) {
        return memberRepository.existsByEmail(email);
    }


}

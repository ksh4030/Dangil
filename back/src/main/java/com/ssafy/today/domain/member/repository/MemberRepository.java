package com.ssafy.today.domain.member.repository;

import com.ssafy.today.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    Optional<Member> findByEmail(String email);

    @Query("SELECT m FROM Member as m WHERE NOT EXISTS (" +
        "SELECT d FROM Diary d WHERE d.member = m AND DATE(d.createdAt) = CURRENT_DATE)")
    List<Member> findYetWrite();
}

package com.ssafy.today.global.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.today.domain.member.entity.Member;
import com.ssafy.today.domain.member.repository.MemberRepository;
import com.ssafy.today.global.security.oauth2.service.OAuth2UserPrincipal;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.ErrorResponseEntity;
import com.ssafy.today.util.response.exception.GlobalException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;

    private final static List<URLMethod> whiteList = new ArrayList<>();

    static {
        //  key 값이 필요 없는 곳은 uri 추가
        whiteList.add(new URLMethod("/api/health", "GET"));
        whiteList.add(new URLMethod("/api/swagger-ui", "GET"));
        whiteList.add(new URLMethod("/api/v3/api-docs", "GET"));


    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = resolveToken(request);
        boolean check;

        if( checkWhiteList(request.getRequestURI(), request.getMethod())){
            filterChain.doFilter(request, response);
            return;
        }

        try {
            check = tokenProvider.validateToken(response, token);
        }catch (GlobalException e){
            setErrorResponse(response, e.getErrorCode());
            return;
        }

        if (StringUtils.hasText(token) && check) {

            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails principal = getUserDetailsPrincipal(authentication);



            try {
                String name = principal.getUsername();
                Long memberId = null;
                Member member = memberRepository.findByEmail(principal.getUsername()).orElseThrow(
                        () -> new GlobalException(ErrorCode.MEMBER_NOT_FOUND));
                memberId = member.getId();

                request.setAttribute("memberId", memberId);

                filterChain.doFilter(request, response);
                return ;
            } catch (GlobalException e) {
                e.printStackTrace();
            }
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
            return token.substring(BEARER_PREFIX.length());
        }

        return null;
    }

    private static UserDetails getUserDetailsPrincipal(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            return userDetails;
        }
        return null;
    }

    private void setErrorResponse(HttpServletResponse response, ErrorCode ec) {
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(ec.getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE + "; charset=utf-8");
        ErrorResponseEntity errorResponseEntity = ErrorResponseEntity.builder()
                .statusCode(ec.getHttpStatus().value())
                .statusName(ec.name())
                .message(ec.getMessage())
                .build();
        try {
            response.getWriter().write(objectMapper.writeValueAsString(errorResponseEntity));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private boolean checkWhiteList(String requestURI, String requestMethod) {
        for (URLMethod urlMethod : whiteList) {
            if (requestURI.startsWith(urlMethod.getUrl()) && requestMethod.equals(
                    urlMethod.getMethod())) {
                return true;
            }
        }
        return false;
    }

}

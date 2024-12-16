package com.ssafy.today.global.security.oauth2.handler;



import com.ssafy.today.domain.member.dto.request.MemberRequest;
import com.ssafy.today.domain.member.service.MemberService;
import com.ssafy.today.global.security.jwt.TokenProvider;
import com.ssafy.today.global.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ssafy.today.global.security.oauth2.service.OAuth2UserPrincipal;
import com.ssafy.today.global.security.oauth2.user.OAuth2Provider;
import com.ssafy.today.global.security.oauth2.user.OAuth2UserInfo;
import com.ssafy.today.global.security.oauth2.user.OAuth2UserUnlinkManager;
import com.ssafy.today.util.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

import static com.ssafy.today.global.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.MODE_PARAM_COOKIE_NAME;
import static com.ssafy.today.global.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final OAuth2UserUnlinkManager oAuth2UserUnlinkManager;
    private final TokenProvider tokenProvider;
    private static final int ACCESS_TOKEN_COOKIE_EXPIRE_SECONDS =  60 * 60 * 24; // 1day
    private static final int REFRESH_TOKEN_EXPIRE_EXPIRE_SECONDS = 30* 60 * 60* 24; // 30day
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String targetUrl;

        targetUrl = determineTargetUrl(request, response, authentication);
        System.out.println("targetUrl : " + targetUrl);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {

        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
            .map(Cookie::getValue);

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String mode = CookieUtils.getCookie(request, MODE_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse("");

        OAuth2UserPrincipal principal = getOAuth2UserPrincipal(authentication);

        if (principal == null) {
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("error", "Login failed")
                    .build().toUriString();
        }
        if ("login".equalsIgnoreCase(mode)) {
            // TODO: DB 저장
            // TODO: 액세스 토큰, 리프레시 토큰 발급
            // TODO: 리프레시 토큰 DB 저장
            String accessToken = tokenProvider.createAccessToken(authentication);
            String refreshToken = tokenProvider.createRefreshToken(authentication);

            MemberRequest memberRequest = MemberRequest.builder()
                    .email(principal.getName())
                    .nickname(principal.getNickName())
                    .build();
            if(!memberService.isMemberExists(principal.getName())){
                memberService.createMember(memberRequest);
            }

            // 엑세스 토큰 쿠키저장
            CookieUtils.addCookie(response,
                    "access_token",
                    accessToken,
                    ACCESS_TOKEN_COOKIE_EXPIRE_SECONDS);
            // 리프레쉬 토큰 쿠키저장
            CookieUtils.addCookie(response,
                    "refresh_token",
                    refreshToken,
                    REFRESH_TOKEN_EXPIRE_EXPIRE_SECONDS);

            return UriComponentsBuilder.fromUriString(targetUrl)
                    .build().toUriString();

        } else if ("unlink".equalsIgnoreCase(mode)) {

            String accessToken = principal.getUserInfo().getAccessToken();
            OAuth2Provider provider = principal.getUserInfo().getProvider();
            // TODO: DB 삭제
            // TODO: 리프레시 토큰 삭제


            oAuth2UserUnlinkManager.unlink(provider, accessToken);
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .build().toUriString();
        }

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", "Login failed")
                .build().toUriString();
    }

    private OAuth2UserPrincipal getOAuth2UserPrincipal(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        if (principal instanceof OAuth2UserPrincipal) {
            return (OAuth2UserPrincipal) principal;
        }
        return null;
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}

package com.ssafy.today.global.security.oauth2.user;

import java.util.Map;

public class KakaoOAuth2UserInfo implements OAuth2UserInfo {

    private final Map<String, Object> attributes;
    private final String accessToken;
    private final String id;
    private final String email;
    private final String nickname;


    public KakaoOAuth2UserInfo(String accessToken, Map<String, Object> attributes) {
        this.accessToken = accessToken;
        // attributes 맵의 kakao_account 키의 값에 실제 attributes 맵이 할당되어 있음
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        this.attributes = kakaoAccount;

        this.id = ((Long) attributes.get("id")).toString();
        this.email = (String) kakaoAccount.get("email");

        this.nickname = (String) profile.get("nickname");

        this.attributes.put("id", id);
        this.attributes.put("email", this.email);
        this.attributes.put("nickname", this.nickname);
    }

    @Override
    public OAuth2Provider getProvider() {
        return OAuth2Provider.KAKAO;
    }

    @Override
    public String getAccessToken() {
        return accessToken;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getNickName() {
        return nickname;
    }


}

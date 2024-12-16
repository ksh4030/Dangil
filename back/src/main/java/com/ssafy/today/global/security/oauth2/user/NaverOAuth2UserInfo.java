package com.ssafy.today.global.security.oauth2.user;

import java.util.Map;

public class NaverOAuth2UserInfo implements OAuth2UserInfo {

    private final Map<String, Object> attributes;
    private final String accessToken;
    private final String id;
    private final String email;
    private final String nickname;

    public NaverOAuth2UserInfo(String accessToken, Map<String, Object> attributes) {
        this.accessToken = accessToken;
        // attributes 맵의 response 키의 값에 실제 attributes 맵이 할당되어 있음
        this.attributes = (Map<String, Object>) attributes.get("response");
        this.id = (String) this.attributes.get("id");
        this.email = (String) this.attributes.get("email");
        this.nickname = (String) this.attributes.get("nickname");
    }

    @Override
    public OAuth2Provider getProvider() {
        return OAuth2Provider.NAVER;
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

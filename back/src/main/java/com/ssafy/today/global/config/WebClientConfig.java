package com.ssafy.today.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient kakaoWebClient(WebClient.Builder builder) {
        return builder.baseUrl("https://kakao.com")
                .build();
    }

    @Bean
    public WebClient naverWebClient(WebClient.Builder builder) {
        return builder.baseUrl("https://naver.com")
                .build();
    }

    @Bean
    public WebClient fastApiWebClient(WebClient.Builder builder) {
        return builder.baseUrl("http://yourfastapi/")
                .build();
    }
}

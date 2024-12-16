package com.ssafy.today.global.config;

import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SwaggerConfig {

  public static final String AUTHORIZATION_HEADER = "authorization";

  @Bean
  public OpenAPI openAPI() {
    SecurityScheme securityScheme = new SecurityScheme()
        .type(SecurityScheme.Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT")
        .in(SecurityScheme.In.HEADER)
        .name(AUTHORIZATION_HEADER);
    SecurityRequirement securityRequirement = new SecurityRequirement()
        .addList(AUTHORIZATION_HEADER);

    return new OpenAPI()
        .components(new Components().addSecuritySchemes(AUTHORIZATION_HEADER, securityScheme))
        .security(Collections.singletonList(securityRequirement))
        .servers(Arrays.asList(new Server().url("https://dangil.store/api") ,new Server().url("http://localhost:8080/api")));
  }
}

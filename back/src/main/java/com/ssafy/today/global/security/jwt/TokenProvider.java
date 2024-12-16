package com.ssafy.today.global.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.today.util.response.ErrorCode;
import com.ssafy.today.util.response.ErrorResponseEntity;
import com.ssafy.today.util.response.exception.GlobalException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.Key;
import java.util.Collections;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Component
public class TokenProvider {

    private static final long ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000 * 60 * 60 * 24 ; // 30min
    private static final long REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000 * 60 * 60 * 24; // 1day
    @Value("${jwt.secret}")
    private String secret;
    private Key key;

    @PostConstruct
    public void init() {
        byte[] key = Decoders.BASE64URL.decode(secret);
        this.key = Keys.hmacShaKeyFor(key);
    }

    public boolean validateToken(HttpServletResponse response, String token) {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (UnsupportedJwtException | MalformedJwtException e) {
            log.error("JWT is not valid");
            throw new GlobalException(ErrorCode.JWT_NOT_VALID);
        } catch (SignatureException e) {
            log.error("JWT signature validation fails");
            throw new GlobalException(ErrorCode.JWT_SIGNATURE_VALIDATION_FAIL);
        } catch (ExpiredJwtException e) {
            log.error("JWT is expired");
            throw new GlobalException(ErrorCode.JWT_IS_EXPIRED);
        } catch (IllegalArgumentException e) {
            log.error("JWT is null or empty or only whitespace");
            throw new GlobalException(ErrorCode.JWT_IS_NULL);
        } catch (Exception e) {
            log.error("JWT validation fails", e);
            throw new GlobalException(ErrorCode.JWT_SIGNATURE_VALIDATION_FAIL);
        }

    }

    public String createAccessToken(Authentication authentication) {

        Date date = new Date();
        Date expiryDate = new Date(date.getTime() + ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS);
        String jwtToken  = Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(date)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
        return jwtToken;
    }

    public String createRefreshToken(Authentication authentication) {

        Date date = new Date();
        Date expiryDate = new Date(date.getTime() + REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS);
        String jwtToken  = Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(date)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
        return jwtToken;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        UserDetails user = new User(claims.getSubject(), "", Collections.emptyList());

        return new UsernamePasswordAuthenticationToken(user, "", Collections.emptyList());
    }


}

package com.ssafy.today.util.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {
  // 성공시
  OK(HttpStatus.OK, "OK"),
  CREATED(HttpStatus.CREATED, "Created Success");

  private final HttpStatus httpStatus;
  private final String message;

}

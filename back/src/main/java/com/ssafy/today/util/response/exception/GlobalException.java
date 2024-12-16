package com.ssafy.today.util.response.exception;


import com.ssafy.today.util.response.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GlobalException extends RuntimeException {
  ErrorCode errorCode;
}

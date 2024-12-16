package com.ssafy.today.util.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@Builder
public class SuccessResponseEntity {

  private int statusCode;
  private String statusName;
  private String message;
  private Object data;

  // 데이터 랜더링 있을때
  public static ResponseEntity<SuccessResponseEntity> getResponseEntity(SuccessCode sc,
      Object data) {
    return ResponseEntity
        .status(sc.getHttpStatus())
        .body(SuccessResponseEntity.builder()
            .statusCode(sc.getHttpStatus().value())
            .statusName(sc.name())
            .message(sc.getMessage())
            .data(data)
            .build());
  }

  // 데이터 랜더링 없을때
  public static ResponseEntity<SuccessResponseEntity> getResponseEntity(SuccessCode sc) {
    return ResponseEntity
        .status(sc.getHttpStatus())
        .body(SuccessResponseEntity.builder()
            .statusCode(sc.getHttpStatus().value())
            .statusName(sc.name())
            .message(sc.getMessage())
            .build());
  }
}

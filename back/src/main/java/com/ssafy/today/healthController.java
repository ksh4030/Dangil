package com.ssafy.today;

import static com.ssafy.today.util.response.SuccessResponseEntity.getResponseEntity;

import com.ssafy.today.util.response.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/health")
public class healthController {
  @GetMapping("")
  public ResponseEntity<?> getStatus(){
    log.info("receive health check request");
    return getResponseEntity(SuccessCode.OK, "isWorking");
  }
}

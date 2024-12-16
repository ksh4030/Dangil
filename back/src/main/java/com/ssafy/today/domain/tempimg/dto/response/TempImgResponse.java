package com.ssafy.today.domain.tempimg.dto.response;

import com.ssafy.today.domain.tempimg.entity.TempImg;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TempImgResponse {
    public String img1;
    public String img2;
    public String img3;
    public String img4;

    public static TempImgResponse fromEntity(TempImg tempImg){
        TempImgResponse tempImgResponse = TempImgResponse.builder()
                .img1(tempImg.getImg1())
                .img2(tempImg.getImg2())
                .img3(tempImg.getImg3())
                .img4(tempImg.getImg4())
                .build();

        return tempImgResponse;
    }
}

package com.ssafy.today.domain.analysis.dto.response;

import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Data
@Builder
public class AnalysisResponse {

    private Integer i;

    private Integer e;

    private Integer s;

    private Integer n;

    private Integer t;

    private Integer f;

    private Integer p;

    private Integer j;

    private Double angry;

    private Double disgust;

    private Double fear;

    private Double happiness;

    private Double sadness;

    private Double surprise;


}


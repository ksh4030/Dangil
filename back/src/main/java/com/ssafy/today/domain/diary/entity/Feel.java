package com.ssafy.today.domain.diary.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Feel {
    ANGRY("angry"), DISGUST("disgust"), FEAR("fear"), HAPPINESS("happiness"), SADNESS("sadness"), SURPRISE("surprise");

    Feel(String value) {
        this.value = value;
    }
    private final String value;

    @JsonValue
    public String getValue(){
        return value;
    }
}

package com.ssafy.today.domain.diary.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum MBTI {
    ISTJ("istj"), ISTP("istp"), ISFJ("isfj"), ISFP("isfp"), INTJ("intj"), INTP("intp"), INFJ("infj"), INFP("infp"), ESTJ("estj"), ESTP("estp"), ESFJ("esfj"), ESFP("esfp"), ENTJ("entj"), ENTP("entp"), ENFJ("enfj"), ENFP("enfp");
    MBTI(String value) {
        this.value = value;
    }
    private final String value;

    @JsonValue
    public String getValue(){
        return value;
    }
}

package com.ssafy.today.domain.elasticsearch.entity;

import lombok.Builder;
import lombok.Getter;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Document(indexName = "diary")
@Getter
public class DiaryEs {

    @Id
    private String _id;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Long)
    private Long memberId;

    @Field(type = FieldType.Long)
    private Long diaryId;

    @Field(type = FieldType.Keyword)
    private String imgUrl;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second_millis)
    private LocalDateTime createdAt;

    @Builder
    public DiaryEs(String content, Long memberId, Long diaryId, String imgUrl, LocalDateTime createdAt) {
        this.content = content;
        this.memberId = memberId;
        this.diaryId = diaryId;
        this.imgUrl = imgUrl;
        this.createdAt = createdAt;
    }

    public void updateContent(String content){
        this.content = content;
    }
}

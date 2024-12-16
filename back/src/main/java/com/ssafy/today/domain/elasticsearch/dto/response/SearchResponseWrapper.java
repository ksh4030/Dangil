package com.ssafy.today.domain.elasticsearch.dto.response;

import java.util.List;

public class SearchResponseWrapper {

    private List<SearchResponse> content;

    public SearchResponseWrapper(List<SearchResponse> content) {
        this.content = content;
    }

    public List<SearchResponse> getContent() {
        return content;
    }

    public void setContent(List<SearchResponse> content) {
        this.content = content;
    }

}

package com.jobportal.common;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaginationResponse<T> {

    private final List<T> items;
    private final long totalItems;
    private final int totalPages;
    private final int page;
    private final int size;
}

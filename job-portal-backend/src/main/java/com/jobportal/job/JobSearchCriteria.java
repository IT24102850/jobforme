package com.jobportal.job;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JobSearchCriteria {
    private String keyword;
    private String location;
    private JobType type;
    private String skills;
    private int page;
    private int size;
}

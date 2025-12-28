package com.jobportal.job;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import com.jobportal.company.Company;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JobResponse {
    private UUID id;
    private String title;
    private String description;
    private String location;
    private JobType type;
    private Integer minSalary;
    private Integer maxSalary;
    private String skills;
    private JobStatus status;
    private Instant createdAt;
    private CompanySummary company;
    private List<String> imageUrls;

    @Getter
    @Builder
    public static class CompanySummary {
        private UUID id;
        private String name;
        private String website;
        private String location;
    }

    public static JobResponse from(Job job) {
        Company company = job.getCompany();
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .location(job.getLocation())
                .type(job.getType())
                .minSalary(job.getMinSalary())
                .maxSalary(job.getMaxSalary())
                .skills(job.getSkills())
                .status(job.getStatus())
                .createdAt(job.getCreatedAt())
                .imageUrls(Optional.ofNullable(job.getImages())
                    .orElseGet(List::of)
                    .stream()
                    .map(JobImage::getImageUrl)
                    .collect(Collectors.toList()))
                .company(company == null ? null : CompanySummary.builder()
                        .id(company.getId())
                        .name(company.getCompanyName())
                        .website(company.getWebsite())
                        .location(company.getLocation())
                        .build())
                .build();
    }
}

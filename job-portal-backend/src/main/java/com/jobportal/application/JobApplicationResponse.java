package com.jobportal.application;

import java.time.Instant;
import java.util.UUID;

import com.jobportal.job.Job;
import com.jobportal.job.JobResponse;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JobApplicationResponse {
    private UUID id;
    private UUID jobId;
    private String jobTitle;
    private JobResponse job;
    private ApplicationStatus status;
    private String coverLetter;
    private String cvUrl;
    private Instant appliedAt;
    private ApplicantSummary applicant;

    @Getter
    @Builder
    public static class ApplicantSummary {
        private UUID seekerId;
        private String name;
        private String email;
    }

    public static JobApplicationResponse forSeeker(JobApplication application) {
        Job job = application.getJob();
        return JobApplicationResponse.builder()
                .id(application.getId())
                .jobId(job.getId())
                .jobTitle(job.getTitle())
                .job(JobResponse.from(job))
                .status(application.getStatus())
                .coverLetter(application.getCoverLetter())
                .cvUrl(application.getCvUrl())
                .appliedAt(application.getAppliedAt())
                .build();
    }

    public static JobApplicationResponse forEmployer(JobApplication application) {
        return JobApplicationResponse.builder()
                .id(application.getId())
                .jobId(application.getJob().getId())
                .jobTitle(application.getJob().getTitle())
                .status(application.getStatus())
                .coverLetter(application.getCoverLetter())
                .cvUrl(application.getCvUrl())
                .appliedAt(application.getAppliedAt())
                .applicant(ApplicantSummary.builder()
                        .seekerId(application.getSeekerUser().getId())
                        .name(application.getSeekerUser().getName())
                        .email(application.getSeekerUser().getEmail())
                        .build())
                .build();
    }
}

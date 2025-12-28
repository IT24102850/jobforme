package com.jobportal.job;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.common.ApiResponse;
import com.jobportal.common.PaginationResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/jobs")
@Validated
@RequiredArgsConstructor
public class JobPublicController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<JobResponse>>> searchJobs(@RequestParam(required = false) String keyword,
                                                                                  @RequestParam(required = false) String location,
                                                                                  @RequestParam(required = false) JobType type,
                                                                                  @RequestParam(required = false) String skills,
                                                                                  @RequestParam(defaultValue = "0") int page,
                                                                                  @RequestParam(defaultValue = "10") int size) {
        JobSearchCriteria criteria = JobSearchCriteria.builder()
                .keyword(keyword)
                .location(location)
                .type(type)
                .skills(skills)
                .page(page)
                .size(size)
                .build();
        PaginationResponse<JobResponse> jobs = jobService.searchJobs(criteria);
        return ResponseEntity.ok(ApiResponse.<PaginationResponse<JobResponse>>builder()
                .success(true)
                .message("Jobs retrieved")
                .data(jobs)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> getJob(@PathVariable("id") UUID jobId) {
        JobResponse job = jobService.getJob(jobId);
        return ResponseEntity.ok(ApiResponse.<JobResponse>builder()
                .success(true)
                .message("Job retrieved")
                .data(job)
                .build());
    }
}

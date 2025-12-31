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
    public ResponseEntity<org.springframework.data.domain.Page<JobResponse>> getJobs(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        org.springframework.data.domain.Page<JobResponse> jobs = jobService.getOpenJobsWithCompany(pageable);
        return ResponseEntity.ok(jobs);
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

package com.jobportal.job;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.auth.UserPrincipal;
import com.jobportal.common.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employer/jobs")
@Validated
@RequiredArgsConstructor
public class EmployerJobController {

    private final JobService jobService;

    @PostMapping
    public ResponseEntity<ApiResponse<JobResponse>> createJob(@AuthenticationPrincipal UserPrincipal currentUser,
                                                              @Valid @RequestBody JobRequest request) {
        JobResponse job = jobService.createJob(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.<JobResponse>builder()
                .success(true)
                .message("Job created")
                .data(job)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> updateJob(@AuthenticationPrincipal UserPrincipal currentUser,
                                                              @PathVariable("id") UUID jobId,
                                                              @Valid @RequestBody JobRequest request) {
        JobResponse job = jobService.updateJob(currentUser.getId(), jobId, request);
        return ResponseEntity.ok(ApiResponse.<JobResponse>builder()
                .success(true)
                .message("Job updated")
                .data(job)
                .build());
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<ApiResponse<JobResponse>> closeJob(@AuthenticationPrincipal UserPrincipal currentUser,
                                                             @PathVariable("id") UUID jobId) {
        JobResponse job = jobService.closeJob(currentUser.getId(), jobId);
        return ResponseEntity.ok(ApiResponse.<JobResponse>builder()
                .success(true)
                .message("Job closed")
                .data(job)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<JobResponse>>> getEmployerJobs(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<JobResponse> jobs = jobService.getEmployerJobs(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.<List<JobResponse>>builder()
                .success(true)
                .message("Jobs retrieved")
                .data(jobs)
                .build());
    }
}

package com.jobportal.application;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.auth.UserPrincipal;
import com.jobportal.common.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seeker")
@Validated
@RequiredArgsConstructor
public class SeekerApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping("/jobs/{jobId}/apply")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> applyToJob(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                          @PathVariable("jobId") UUID jobId,
                                                                          @Valid @RequestBody JobApplicationRequest request) {
        JobApplicationResponse response = jobApplicationService.applyToJob(currentUser.getId(), jobId, request);
        return ResponseEntity.ok(ApiResponse.<JobApplicationResponse>builder()
                .success(true)
                .message("Applied successfully")
                .data(response)
                .build());
    }

    @GetMapping("/applications")
    public ResponseEntity<ApiResponse<List<JobApplicationResponse>>> getApplications(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<JobApplicationResponse> applications = jobApplicationService.getSeekerApplications(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.<List<JobApplicationResponse>>builder()
                .success(true)
                .message("Applications retrieved")
                .data(applications)
                .build());
    }
}

package com.jobportal.application;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.auth.UserPrincipal;
import com.jobportal.common.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employer")
@Validated
@RequiredArgsConstructor
public class EmployerApplicationController {

    private final JobApplicationService jobApplicationService;

    @GetMapping("/jobs/{jobId}/applications")
    public ResponseEntity<ApiResponse<List<JobApplicationResponse>>> getApplicants(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                                   @PathVariable("jobId") UUID jobId) {
        List<JobApplicationResponse> applications = jobApplicationService.getEmployerApplications(currentUser.getId(), jobId);
        return ResponseEntity.ok(ApiResponse.<List<JobApplicationResponse>>builder()
                .success(true)
                .message("Applications retrieved")
                .data(applications)
                .build());
    }

    @PatchMapping("/applications/{appId}/status")
    public ResponseEntity<ApiResponse<JobApplicationResponse>> updateStatus(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                            @PathVariable("appId") UUID applicationId,
                                                                            @Valid @RequestBody ApplicationStatusUpdateRequest request) {
        JobApplicationResponse response = jobApplicationService.updateApplicationStatus(currentUser.getId(), applicationId, request.getStatus());
        return ResponseEntity.ok(ApiResponse.<JobApplicationResponse>builder()
                .success(true)
                .message("Status updated")
                .data(response)
                .build());
    }
}

package com.jobportal.admin;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.common.ApiResponse;
import com.jobportal.job.JobResponse;
import com.jobportal.user.UserResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@Validated
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsers() {
        List<UserResponse> users = adminService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.<List<UserResponse>>builder()
                .success(true)
                .message("Users retrieved")
                .data(users)
                .build());
    }

    @PatchMapping("/users/{id}/disable")
    public ResponseEntity<ApiResponse<UserResponse>> disableUser(@PathVariable("id") UUID userId) {
        UserResponse user = adminService.disableUser(userId);
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User disabled")
                .data(user)
                .build());
    }

    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getJobs() {
        List<JobResponse> jobs = adminService.getAllJobs();
        return ResponseEntity.ok(ApiResponse.<List<JobResponse>>builder()
                .success(true)
                .message("Jobs retrieved")
                .data(jobs)
                .build());
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable("id") UUID jobId) {
        adminService.deleteJob(jobId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Job deleted")
                .data(null)
                .build());
    }
}

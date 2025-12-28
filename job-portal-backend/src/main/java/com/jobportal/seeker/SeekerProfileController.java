package com.jobportal.seeker;

import java.io.IOException;
import java.nio.file.Files;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.auth.UserPrincipal;
import com.jobportal.common.ApiResponse;
import com.jobportal.common.FileStorageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seeker")
@Validated
@RequiredArgsConstructor
public class SeekerProfileController {

    private final SeekerProfileService seekerProfileService;
    private final FileStorageService fileStorageService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<SeekerProfileResponse>> getProfile(@AuthenticationPrincipal UserPrincipal currentUser) {
        SeekerProfileResponse profile = seekerProfileService.getProfile(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.<SeekerProfileResponse>builder()
                .success(true)
                .message("Profile retrieved")
                .data(profile)
                .build());
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<SeekerProfileResponse>> updateProfile(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                            @Valid @RequestBody SeekerProfileRequest request) {
        SeekerProfileResponse profile = seekerProfileService.upsertProfile(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.<SeekerProfileResponse>builder()
                .success(true)
                .message("Profile saved")
                .data(profile)
                .build());
    }

    @PostMapping("/profile/cv")
    public ResponseEntity<ApiResponse<SeekerProfileResponse>> uploadCv(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                        @RequestParam("file") MultipartFile file) {
        SeekerProfileResponse profile = seekerProfileService.uploadCv(currentUser.getId(), file);
        return ResponseEntity.ok(ApiResponse.<SeekerProfileResponse>builder()
                .success(true)
                .message("CV uploaded")
                .data(profile)
                .build());
    }

    @GetMapping("/profile/cv")
    public ResponseEntity<Resource> downloadCv(@AuthenticationPrincipal UserPrincipal currentUser) throws IOException {
        SeekerProfile profile = seekerProfileService.findProfile(currentUser.getId());
        if (profile.getCvUrl() == null) {
            throw new com.jobportal.common.ResourceNotFoundException("CV not uploaded");
        }
        Resource resource = fileStorageService.loadFile(profile.getCvUrl());
        String contentDisposition = "attachment; filename=\"cv-" + currentUser.getId() + ".pdf\"";
        String contentType = Files.probeContentType(resource.getFile().toPath());
        if (contentType == null) {
            contentType = MediaType.APPLICATION_PDF_VALUE;
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(resource);
    }
}

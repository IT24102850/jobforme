package com.jobportal.seeker;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.common.ApiException;
import com.jobportal.common.BadRequestException;
import com.jobportal.common.FileStorageService;
import com.jobportal.common.ResourceNotFoundException;
import com.jobportal.user.User;
import com.jobportal.user.UserRole;
import com.jobportal.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeekerProfileService {

    private static final long MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;

    private final SeekerProfileRepository seekerProfileRepository;
    private final UserService userService;
    private final FileStorageService fileStorageService;

    public SeekerProfileResponse getProfile(UUID seekerId) {
        return seekerProfileRepository.findBySeekerUserId(seekerId)
                .map(SeekerProfileResponse::from)
                .orElse(SeekerProfileResponse.builder().build());
    }

    @Transactional
    public SeekerProfileResponse upsertProfile(UUID seekerId, SeekerProfileRequest request) {
        User seeker = userService.getById(seekerId);
        if (seeker.getRole() != UserRole.SEEKER) {
            throw new BadRequestException("Only seekers can manage profiles");
        }
        SeekerProfile profile = seekerProfileRepository.findBySeekerUserId(seekerId)
                .orElseGet(() -> {
                    SeekerProfile newProfile = new SeekerProfile();
                    newProfile.setSeekerUser(seeker);
                    return newProfile;
                });
        profile.setEducation(request.getEducation());
        profile.setExperience(request.getExperience());
        profile.setSkills(request.getSkills());
        seekerProfileRepository.save(profile);
        return SeekerProfileResponse.from(profile);
    }

    @Transactional
    public SeekerProfileResponse uploadCv(UUID seekerId, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File is required");
        }
        if (file.getSize() > MAX_CV_SIZE_BYTES) {
            throw new BadRequestException("File size exceeds limit");
        }
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equalsIgnoreCase("application/pdf")) {
            throw new BadRequestException("Only PDF files are allowed");
        }
        String storedPath = fileStorageService.storeFile(file);
        if (!StringUtils.hasText(storedPath)) {
            throw new ApiException("Failed to store CV");
        }
        User seeker = userService.getById(seekerId);
        if (seeker.getRole() != UserRole.SEEKER) {
            throw new BadRequestException("Only seekers can upload CV");
        }
        SeekerProfile profile = seekerProfileRepository.findBySeekerUserId(seekerId)
                .orElseGet(() -> {
                    SeekerProfile newProfile = new SeekerProfile();
                    newProfile.setSeekerUser(seeker);
                    return newProfile;
                });
        profile.setCvUrl(storedPath);
        seekerProfileRepository.save(profile);
        return SeekerProfileResponse.from(profile);
    }

    public SeekerProfile findProfile(UUID seekerId) {
        return seekerProfileRepository.findBySeekerUserId(seekerId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
    }
}

package com.jobportal.seeker;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SeekerProfileResponse {
    private UUID id;
    private String education;
    private String experience;
    private String skills;
    private String cvUrl;

    public static SeekerProfileResponse from(SeekerProfile profile) {
        if (profile == null) {
            return null;
        }
        return SeekerProfileResponse.builder()
                .id(profile.getId())
                .education(profile.getEducation())
                .experience(profile.getExperience())
                .skills(profile.getSkills())
                .cvUrl(profile.getCvUrl())
                .build();
    }
}

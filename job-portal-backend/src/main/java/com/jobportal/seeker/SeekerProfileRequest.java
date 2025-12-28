package com.jobportal.seeker;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeekerProfileRequest {

    @Size(max = 255)
    private String education;

    private String experience;

    private String skills;
}

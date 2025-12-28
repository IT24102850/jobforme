package com.jobportal.job;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String location;

    @NotNull
    private JobType type;

    private Integer minSalary;
    private Integer maxSalary;

    private String skills;

    @Size(max = 10)
    private List<@NotBlank String> imageUrls = new ArrayList<>();
}

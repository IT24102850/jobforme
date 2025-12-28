package com.jobportal.company;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyRequest {

    @NotBlank
    private String companyName;

    private String website;
    private String location;
    private String about;
}

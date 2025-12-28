package com.jobportal.company;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CompanyResponse {
    private UUID id;
    private String companyName;
    private String website;
    private String location;
    private String about;

    public static CompanyResponse from(Company company) {
        if (company == null) {
            return null;
        }
        return CompanyResponse.builder()
                .id(company.getId())
                .companyName(company.getCompanyName())
                .website(company.getWebsite())
                .location(company.getLocation())
                .about(company.getAbout())
                .build();
    }
}

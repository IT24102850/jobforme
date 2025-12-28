package com.jobportal.company;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.common.BadRequestException;
import com.jobportal.common.ResourceNotFoundException;
import com.jobportal.user.User;
import com.jobportal.user.UserRole;
import com.jobportal.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserService userService;

    public Company getCompanyForEmployer(UUID employerId) {
        return companyRepository.findByEmployerUserId(employerId)
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));
    }

    public CompanyResponse getCompanyResponse(UUID employerId) {
        return CompanyResponse.from(getCompanyForEmployer(employerId));
    }

    @Transactional
    public CompanyResponse upsertCompany(UUID employerId, CompanyRequest request) {
        User employer = userService.getById(employerId);
        if (employer.getRole() != UserRole.EMPLOYER) {
            throw new BadRequestException("Only employers can manage company profile");
        }
        Company company = companyRepository.findByEmployerUserId(employerId)
                .orElseGet(() -> {
                    Company newCompany = new Company();
                    newCompany.setEmployerUser(employer);
                    return newCompany;
                });
        company.setCompanyName(request.getCompanyName());
        company.setWebsite(request.getWebsite());
        company.setLocation(request.getLocation());
        company.setAbout(request.getAbout());
        companyRepository.save(company);
        return CompanyResponse.from(company);
    }
}

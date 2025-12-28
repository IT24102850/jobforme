package com.jobportal.company;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.auth.UserPrincipal;
import com.jobportal.common.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employer/company")
@Validated
@RequiredArgsConstructor
public class EmployerCompanyController {

    private final CompanyService companyService;

    @GetMapping
    public ResponseEntity<ApiResponse<CompanyResponse>> getCompany(@AuthenticationPrincipal UserPrincipal currentUser) {
        UUID employerId = currentUser.getId();
        CompanyResponse company = companyService.getCompanyResponse(employerId);
        return ResponseEntity.ok(ApiResponse.<CompanyResponse>builder()
                .success(true)
                .message("Company retrieved")
                .data(company)
                .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<CompanyResponse>> updateCompany(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                      @Valid @RequestBody CompanyRequest request) {
        CompanyResponse company = companyService.upsertCompany(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.<CompanyResponse>builder()
                .success(true)
                .message("Company saved")
                .data(company)
                .build());
    }
}

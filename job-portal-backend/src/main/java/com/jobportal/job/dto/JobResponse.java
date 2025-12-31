package com.jobportal.job.dto;

import java.time.Instant;
import java.util.UUID;

public record JobResponse(
        UUID id,
        String title,
        String description,
        String location,
        String type,
        Integer minSalary,
        Integer maxSalary,
        String skills,
        String status,
        Instant createdAt,
        UUID companyId,
        String companyName
) {}

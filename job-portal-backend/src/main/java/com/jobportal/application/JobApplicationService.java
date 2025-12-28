package com.jobportal.application;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.common.BadRequestException;
import com.jobportal.common.ResourceNotFoundException;
import com.jobportal.job.Job;
import com.jobportal.job.JobService;
import com.jobportal.job.JobStatus;
import com.jobportal.seeker.SeekerProfile;
import com.jobportal.seeker.SeekerProfileService;
import com.jobportal.user.User;
import com.jobportal.user.UserRole;
import com.jobportal.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobService jobService;
    private final SeekerProfileService seekerProfileService;
    private final UserService userService;

    @Transactional
    public JobApplicationResponse applyToJob(UUID seekerId, UUID jobId, JobApplicationRequest request) {
        User seeker = userService.getById(seekerId);
        if (seeker.getRole() != UserRole.SEEKER) {
            throw new BadRequestException("Only seekers can apply to jobs");
        }
        Job job = jobService.getJobEntity(jobId);
        if (job.getStatus() != JobStatus.OPEN) {
            throw new BadRequestException("Job is not open");
        }
        applicationRepository.findByJobIdAndSeekerUserId(jobId, seekerId).ifPresent(existing -> {
            throw new BadRequestException("Already applied to this job");
        });
        SeekerProfile profile = seekerProfileService.findProfile(seekerId);
        if (profile.getCvUrl() == null) {
            throw new BadRequestException("Upload CV before applying");
        }
        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setSeekerUser(seeker);
        application.setCvUrl(profile.getCvUrl());
        application.setCoverLetter(request.getCoverLetter());
        application.setStatus(ApplicationStatus.APPLIED);
        applicationRepository.save(application);
        return JobApplicationResponse.forSeeker(application);
    }

    public List<JobApplicationResponse> getSeekerApplications(UUID seekerId) {
        return applicationRepository.findBySeekerUserId(seekerId)
                .stream()
                .map(JobApplicationResponse::forSeeker)
                .collect(Collectors.toList());
    }

    public List<JobApplicationResponse> getEmployerApplications(UUID employerId, UUID jobId) {
        Job job = jobService.getEmployerJobOrThrow(employerId, jobId);
        return applicationRepository.findByJobId(job.getId())
                .stream()
                .map(JobApplicationResponse::forEmployer)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobApplicationResponse updateApplicationStatus(UUID employerId, UUID applicationId, ApplicationStatus status) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        if (!application.getJob().getCompany().getEmployerUser().getId().equals(employerId)) {
            throw new BadRequestException("Application does not belong to employer");
        }
        application.setStatus(status);
        applicationRepository.save(application);
        return JobApplicationResponse.forEmployer(application);
    }
}

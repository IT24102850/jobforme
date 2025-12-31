package com.jobportal.job;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.common.BadRequestException;
import com.jobportal.common.PaginationResponse;
import com.jobportal.common.ResourceNotFoundException;
import com.jobportal.company.Company;
import com.jobportal.company.CompanyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;


    public org.springframework.data.domain.Page<JobResponse> getOpenJobsWithCompany(Pageable pageable) {
        Page<Job> jobs = jobRepository.findAllWithCompany(pageable);
        return jobs.map(JobResponse::from);
    }

    public JobResponse getJob(UUID jobId) {
        return JobResponse.from(getJobEntity(jobId));
    }

    public Job getJobEntity(UUID jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
    }

    @Transactional
    public JobResponse createJob(UUID employerId, JobRequest request) {
        Company company = companyRepository.findByEmployerUserId(employerId)
                .orElseThrow(() -> new BadRequestException("Create company profile before posting jobs"));
        Job job = new Job();
        job.setCompany(company);
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setType(request.getType());
        job.setMinSalary(request.getMinSalary());
        job.setMaxSalary(request.getMaxSalary());
        job.setSkills(request.getSkills());
        job.setStatus(JobStatus.OPEN);
        jobRepository.save(job);
        return JobResponse.from(job);
    }

    @Transactional
    public JobResponse updateJob(UUID employerId, UUID jobId, JobRequest request) {
        Job job = getEmployerJobOrThrow(employerId, jobId);
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setType(request.getType());
        job.setMinSalary(request.getMinSalary());
        job.setMaxSalary(request.getMaxSalary());
        job.setSkills(request.getSkills());
        jobRepository.save(job);
        return JobResponse.from(job);
    }

    @Transactional
    public JobResponse closeJob(UUID employerId, UUID jobId) {
        Job job = getEmployerJobOrThrow(employerId, jobId);
        job.setStatus(JobStatus.CLOSED);
        jobRepository.save(job);
        return JobResponse.from(job);
    }

    public List<JobResponse> getEmployerJobs(UUID employerId) {
        return jobRepository.findByCompany_EmployerUser_Id(employerId)
                .stream()
                .map(JobResponse::from)
                .collect(Collectors.toList());
    }

    public Job getEmployerJobOrThrow(UUID employerId, UUID jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        if (job.getCompany() == null || !job.getCompany().getEmployerUser().getId().equals(employerId)) {
            throw new BadRequestException("Job does not belong to employer");
        }
        return job;
    }
}

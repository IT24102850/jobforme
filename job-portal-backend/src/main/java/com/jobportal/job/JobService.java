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

    public PaginationResponse<JobResponse> searchJobs(JobSearchCriteria criteria) {
        Specification<Job> spec = Specification.where(JobSpecifications.onlyOpen())
                .and(JobSpecifications.withKeyword(criteria.getKeyword()))
                .and(JobSpecifications.withLocation(criteria.getLocation()))
                .and(JobSpecifications.withType(criteria.getType()))
                .and(JobSpecifications.withSkills(criteria.getSkills()));

        int page = Math.max(criteria.getPage(), 0);
        int size = Math.max(criteria.getSize(), 1);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Job> jobs = jobRepository.findAll(spec, pageable);
        List<JobResponse> items = jobs.stream()
                .map(JobResponse::from)
                .collect(Collectors.toList());

        return PaginationResponse.<JobResponse>builder()
                .items(items)
                .totalItems(jobs.getTotalElements())
                .totalPages(jobs.getTotalPages())
                .page(page)
                .size(size)
                .build();
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

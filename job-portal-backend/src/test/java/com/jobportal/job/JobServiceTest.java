package com.jobportal.job;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jobportal.common.BadRequestException;
import com.jobportal.company.Company;
import com.jobportal.company.CompanyRepository;

@ExtendWith(MockitoExtension.class)
class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private JobService jobService;

    @Test
    void createJob_shouldPersistJobForEmployer() {
        UUID employerId = UUID.randomUUID();
        Company company = new Company();
        when(companyRepository.findByEmployerUserId(employerId)).thenReturn(Optional.of(company));
        when(jobRepository.save(any(Job.class))).thenAnswer(invocation -> invocation.getArgument(0));

        JobRequest request = new JobRequest();
        request.setTitle("Engineer");
        request.setDescription("Build stuff");
        request.setLocation("Remote");
        request.setType(JobType.FULL_TIME);
        request.setMinSalary(50000);
        request.setMaxSalary(80000);
        request.setSkills("Java, Spring");

        JobResponse response = jobService.createJob(employerId, request);

        ArgumentCaptor<Job> jobCaptor = ArgumentCaptor.forClass(Job.class);
        verify(jobRepository).save(jobCaptor.capture());
        Job saved = jobCaptor.getValue();
        assertThat(saved.getCompany()).isEqualTo(company);
        assertThat(saved.getStatus()).isEqualTo(JobStatus.OPEN);
        assertThat(response.getTitle()).isEqualTo("Engineer");
    }

    @Test
    void createJob_withoutCompanyShouldFail() {
        UUID employerId = UUID.randomUUID();
        when(companyRepository.findByEmployerUserId(employerId)).thenReturn(Optional.empty());

        JobRequest request = new JobRequest();
        request.setTitle("Engineer");
        request.setDescription("Build stuff");
        request.setLocation("Remote");
        request.setType(JobType.FULL_TIME);

        assertThatThrownBy(() -> jobService.createJob(employerId, request))
                .isInstanceOf(BadRequestException.class);
    }
}

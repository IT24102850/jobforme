package com.jobportal.admin;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.common.ResourceNotFoundException;
import com.jobportal.job.Job;
import com.jobportal.job.JobRepository;
import com.jobportal.job.JobResponse;
import com.jobportal.user.User;
import com.jobportal.user.UserResponse;
import com.jobportal.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserService userService;
    private final JobRepository jobRepository;

    public List<UserResponse> getAllUsers() {
        return userService.findAll()
                .stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserResponse disableUser(UUID userId) {
        User user = userService.disableUser(userId);
        return UserResponse.from(user);
    }

    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(JobResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteJob(UUID jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        job.setStatus(com.jobportal.job.JobStatus.CLOSED);
        jobRepository.save(job);
    }
}

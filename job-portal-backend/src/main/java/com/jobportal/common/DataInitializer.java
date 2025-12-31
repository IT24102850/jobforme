package com.jobportal.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.company.Company;
import com.jobportal.company.CompanyRepository;
import com.jobportal.job.Job;
import com.jobportal.job.JobRepository;
import com.jobportal.job.JobStatus;
import com.jobportal.job.JobType;
import com.jobportal.user.User;
import com.jobportal.user.UserRepository;
import com.jobportal.user.UserRole;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@jobportal.com}")
    private String adminEmail;

    @Value("${app.admin.password:Admin@123}")
    private String adminPassword;

    @Override
    @Transactional
    public void run(String... args) {
        seedAdminUser();
        seedSampleJob();
    }

    private void seedAdminUser() {
        if (userRepository.findByEmail(adminEmail).isPresent()) {
            User user = userRepository.findByEmail(adminEmail).get();
            if (user.getRole() != UserRole.ADMIN) {
                user.setRole(UserRole.ADMIN);
                userRepository.save(user);
            }
        } else {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode(adminPassword));
            admin.setRole(UserRole.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);
        }
    }

    private void seedSampleJob() {
        if (jobRepository.count() > 0) {
            return;
        }
        User employer = userRepository.findByEmail("employer@jobportal.com")
                .orElseGet(() -> {
                    User user = new User();
                    user.setName("Acme Hiring");
                    user.setEmail("employer@jobportal.com");
                    user.setPasswordHash(passwordEncoder.encode("Employer@123"));
                    user.setRole(UserRole.EMPLOYER);
                    user.setEnabled(true);
                    return userRepository.save(user);
                });
        Company company = companyRepository.findByEmployerUserId(employer.getId())
                .orElseGet(() -> {
                    Company comp = new Company();
                    comp.setEmployerUser(employer);
                    comp.setCompanyName("Acme Corp");
                    comp.setWebsite("https://acme.example.com");
                    comp.setLocation("Remote");
                    comp.setAbout("Innovative solutions for modern problems.");
                    return companyRepository.save(comp);
                });
        Job job = new Job();
        job.setCompany(company);
        job.setTitle("Full Stack Engineer");
        job.setDescription("Work on end-to-end features using Spring Boot and React.");
        job.setLocation("Remote");
        job.setType(JobType.FULL_TIME);
        job.setMinSalary(90000);
        job.setMaxSalary(120000);
        job.setSkills("Spring Boot, React, PostgreSQL");
        job.setStatus(JobStatus.OPEN);
        jobRepository.save(job);
    }
}

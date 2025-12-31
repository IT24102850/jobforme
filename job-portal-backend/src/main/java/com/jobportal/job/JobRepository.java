package com.jobportal.job;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, UUID>, JpaSpecificationExecutor<Job> {
	List<Job> findByCompany_EmployerUser_Id(UUID employerId);

	@org.springframework.data.jpa.repository.Query(
		value = "SELECT j FROM Job j JOIN FETCH j.company",
		countQuery = "SELECT COUNT(j) FROM Job j"
	)
	org.springframework.data.domain.Page<Job> findAllWithCompany(org.springframework.data.domain.Pageable pageable);
}

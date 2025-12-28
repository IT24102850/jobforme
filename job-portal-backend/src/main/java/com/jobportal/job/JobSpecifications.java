package com.jobportal.job;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public final class JobSpecifications {

    private JobSpecifications() {
    }

    public static Specification<Job> withKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(keyword)) {
                return null;
            }
            String likeKeyword = "%" + keyword.toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), likeKeyword),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeKeyword)
            );
        };
    }

    public static Specification<Job> withLocation(String location) {
        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(location)) {
                return null;
            }
            return criteriaBuilder.equal(criteriaBuilder.lower(root.get("location")), location.toLowerCase());
        };
    }

    public static Specification<Job> withType(JobType type) {
        return (root, query, criteriaBuilder) -> {
            if (type == null) {
                return null;
            }
            return criteriaBuilder.equal(root.get("type"), type);
        };
    }

    public static Specification<Job> withSkills(String skills) {
        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(skills)) {
                return null;
            }
            String likeSkills = "%" + skills.toLowerCase() + "%";
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("skills")), likeSkills);
        };
    }

    public static Specification<Job> onlyOpen() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), JobStatus.OPEN);
    }
}

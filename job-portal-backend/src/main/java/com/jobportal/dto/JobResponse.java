package com.jobportal.dto;

import java.util.List;

public class JobResponse {
    private String id;
    private String title;
    private String description;
    private String location;
    private String type;
    private Integer minSalary;
    private Integer maxSalary;
    private String skills;
    private String status;
    private String createdAt;
    private CompanyInfo company;
    private List<String> imageUrls;

    public static class CompanyInfo {
        private String id;
        private String companyName;
        private String website;
        private String location;
        private String about;
        // getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getWebsite() { return website; }
        public void setWebsite(String website) { this.website = website; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getAbout() { return about; }
        public void setAbout(String about) { this.about = about; }
    }

    // getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Integer getMinSalary() { return minSalary; }
    public void setMinSalary(Integer minSalary) { this.minSalary = minSalary; }
    public Integer getMaxSalary() { return maxSalary; }
    public void setMaxSalary(Integer maxSalary) { this.maxSalary = maxSalary; }
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public CompanyInfo getCompany() { return company; }
    public void setCompany(CompanyInfo company) { this.company = company; }
    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
}

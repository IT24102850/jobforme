package com.jobportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.jobportal.auth.JwtProperties;
import com.jobportal.common.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({FileStorageProperties.class, JwtProperties.class})
public class JobPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobPortalApplication.class, args);
    }
}

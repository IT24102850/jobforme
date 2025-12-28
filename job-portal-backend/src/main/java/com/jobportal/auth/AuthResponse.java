package com.jobportal.auth;

import java.util.UUID;

import com.jobportal.user.User;
import com.jobportal.user.UserRole;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {
    private String accessToken;
    private UUID userId;
    private String name;
    private String email;
    private UserRole role;

    public static AuthResponse from(User user, String token) {
        return AuthResponse.builder()
                .accessToken(token)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}

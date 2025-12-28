package com.jobportal.seeker;

import java.util.UUID;

import com.jobportal.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seeker_profiles", uniqueConstraints = {
        @UniqueConstraint(name = "uk_seeker_user", columnNames = "seeker_user_id")
})
@Getter
@Setter
@NoArgsConstructor
public class SeekerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_user_id", nullable = false, unique = true)
    private User seekerUser;

    private String education;

    @Column(columnDefinition = "TEXT")
    private String experience;

    private String skills;

    @Column(name = "cv_url")
    private String cvUrl;
}

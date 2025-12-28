BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uk_user_email UNIQUE (email),
    CONSTRAINT chk_user_role CHECK (role IN ('ADMIN', 'EMPLOYER', 'SEEKER'))
);

CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_user_id UUID NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    location VARCHAR(255),
    about TEXT,
    CONSTRAINT fk_company_employer_user FOREIGN KEY (employer_user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS seeker_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seeker_user_id UUID NOT NULL UNIQUE,
    education VARCHAR(255),
    experience TEXT,
    skills VARCHAR(255),
    cv_url VARCHAR(1024),
    CONSTRAINT fk_seeker_profile_user FOREIGN KEY (seeker_user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,
    min_salary INTEGER,
    max_salary INTEGER,
    skills VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_job_company FOREIGN KEY (company_id)
        REFERENCES companies (id) ON DELETE CASCADE,
    CONSTRAINT chk_job_type CHECK (type IN ('FULL_TIME', 'PART_TIME', 'INTERN', 'CONTRACT')),
    CONSTRAINT chk_job_status CHECK (status IN ('OPEN', 'CLOSED'))
);

CREATE TABLE IF NOT EXISTS job_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL,
    image_url VARCHAR(1024) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_job_image_job FOREIGN KEY (job_id)
        REFERENCES jobs (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    image_url VARCHAR(1024) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_user_image_user FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL,
    seeker_user_id UUID NOT NULL,
    cv_url VARCHAR(1024) NOT NULL,
    cover_letter TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'APPLIED',
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_application_job FOREIGN KEY (job_id)
        REFERENCES jobs (id) ON DELETE CASCADE,
    CONSTRAINT fk_application_seeker FOREIGN KEY (seeker_user_id)
        REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT uk_application_job_seeker UNIQUE (job_id, seeker_user_id),
    CONSTRAINT chk_application_status CHECK (status IN ('APPLIED', 'REVIEWING', 'INTERVIEW', 'REJECTED', 'OFFERED'))
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs (company_id);
CREATE INDEX IF NOT EXISTS idx_job_images_job ON job_images (job_id);
CREATE INDEX IF NOT EXISTS idx_user_images_user ON user_images (user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job ON job_applications (job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_seeker ON job_applications (seeker_user_id);

-- Seed data
WITH inserted_users AS (
    INSERT INTO users (id, name, email, password_hash, role)
    VALUES
        ('00000000-0000-0000-0000-000000000001', 'Alice Admin', 'admin@jobforme.com', '$2a$10$Dow1wdkZ0pniS3pS3kMt2uI9gBjjlHzvEihQ/HVbUaz2QmiFjCqFa', 'ADMIN'),
        ('00000000-0000-0000-0000-000000000002', 'Ethan Employer', 'employer@jobforme.com', '$2a$10$Dow1wdkZ0pniS3pS3kMt2uI9gBjjlHzvEihQ/HVbUaz2QmiFjCqFa', 'EMPLOYER'),
        ('00000000-0000-0000-0000-000000000003', 'Sienna Seeker', 'seeker@jobforme.com', '$2a$10$Dow1wdkZ0pniS3pS3kMt2uI9gBjjlHzvEihQ/HVbUaz2QmiFjCqFa', 'SEEKER')
    ON CONFLICT (email) DO NOTHING
    RETURNING id, role
)
INSERT INTO companies (id, employer_user_id, company_name, website, location, about)
VALUES
    ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'TechNova Labs', 'https://www.technova.example', 'San Francisco, CA', 'Innovative SaaS solutions for global teams')
ON CONFLICT (employer_user_id) DO NOTHING;

INSERT INTO seeker_profiles (id, seeker_user_id, education, experience, skills, cv_url)
VALUES
    ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'B.S. Computer Science', '3 years of full-stack development in fintech.', 'Java, Spring Boot, React, PostgreSQL', 'https://cdn.jobforme.com/cv/sienna.pdf')
ON CONFLICT (seeker_user_id) DO NOTHING;

INSERT INTO jobs (id, company_id, title, description, location, type, min_salary, max_salary, skills, status)
VALUES
    ('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Senior Backend Engineer', 'Design and build scalable APIs and services powering our collaboration platform.', 'Remote - US', 'FULL_TIME', 140000, 180000, 'Java, Spring Boot, PostgreSQL, AWS', 'OPEN'),
    ('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Frontend Engineer', 'Deliver delightful UX experiences using React and TypeScript.', 'Austin, TX', 'FULL_TIME', 110000, 140000, 'React, TypeScript, GraphQL, CSS', 'OPEN')
ON CONFLICT (id) DO NOTHING;

INSERT INTO job_images (id, job_id, image_url)
VALUES
    ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'https://cdn.jobforme.com/jobs/backend-team-1.jpg'),
    ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 'https://cdn.jobforme.com/jobs/backend-office-2.jpg'),
    ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000002', 'https://cdn.jobforme.com/jobs/frontend-workspace-1.jpg')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_images (id, user_id, image_url)
VALUES
    ('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'https://cdn.jobforme.com/users/ethan/headshot.jpg'),
    ('50000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'https://cdn.jobforme.com/users/ethan/team.jpg'),
    ('50000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'https://cdn.jobforme.com/users/sienna/profile.jpg')
ON CONFLICT (id) DO NOTHING;

INSERT INTO job_applications (id, job_id, seeker_user_id, cv_url, cover_letter, status)
VALUES
    ('60000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'https://cdn.jobforme.com/cv/sienna.pdf', 'Excited to contribute backend expertise to TechNova.', 'REVIEWING')
ON CONFLICT (job_id, seeker_user_id) DO NOTHING;

COMMIT;

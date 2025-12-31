export type UserRole = 'ADMIN' | 'EMPLOYER' | 'SEEKER';

export interface AuthResponse {
  accessToken: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  page: number;
  size: number;
}

export type JobStatus = 'OPEN' | 'CLOSED';

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'INTERN' | 'CONTRACT';

export interface CompanySummary {
  id: string;
  name: string;
  website?: string;
  location?: string;
  about?: string;
}

export interface JobImage {
  imageUrl: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: JobType;
  minSalary?: number;
  maxSalary?: number;
  skills?: string;
  status: JobStatus;
  createdAt: string;
  company?: CompanySummary;
  images?: JobImage[];
}

export interface JobFormValues {
  title: string;
  description: string;
  location: string;
  type: JobType;
  minSalary?: number | '';
  maxSalary?: number | '';
  skills?: string;
}

export interface CompanyProfile {
  id?: string;
  companyName: string;
  website?: string;
  location?: string;
  about?: string;
}

export interface SeekerProfile {
  id?: string;
  education?: string;
  experience?: string;
  skills?: string;
  cvUrl?: string | null;
}

export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'INTERVIEW';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  status: ApplicationStatus;
  coverLetter?: string;
  cvUrl: string;
  appliedAt: string;
  job?: Job;
  applicant?: {
    seekerId: string;
    name: string;
    email: string;
  };
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enabled: boolean;
  createdAt: string;
}

import apiClient from './axios';
import { ApiResponse, CompanyProfile, Job, JobApplication, JobFormValues } from '../types';

export async function fetchCompanyProfile() {
  const response = await apiClient.get<ApiResponse<CompanyProfile>>('/api/employer/company');
  return response.data.data;
}

export async function updateCompanyProfile(payload: CompanyProfile) {
  const response = await apiClient.put<ApiResponse<CompanyProfile>>('/api/employer/company', payload);
  return response.data.data;
}

export async function fetchEmployerJobs() {
  const response = await apiClient.get<ApiResponse<Job[]>>('/api/employer/jobs');
  return response.data.data;
}

export async function createJob(payload: JobFormValues) {
  const response = await apiClient.post<ApiResponse<Job>>('/api/employer/jobs', payload);
  return response.data.data;
}

export async function updateJob(jobId: string, payload: JobFormValues) {
  const response = await apiClient.put<ApiResponse<Job>>(`/api/employer/jobs/${jobId}`, payload);
  return response.data.data;
}

export async function closeJob(jobId: string) {
  const response = await apiClient.patch<ApiResponse<Job>>(`/api/employer/jobs/${jobId}/close`, {});
  return response.data.data;
}

export async function fetchApplicants(jobId: string) {
  const response = await apiClient.get<ApiResponse<JobApplication[]>>(`/api/employer/jobs/${jobId}/applications`);
  return response.data.data;
}

export async function updateApplicantStatus(appId: string, status: string) {
  const response = await apiClient.patch<ApiResponse<JobApplication>>(`/api/employer/applications/${appId}/status`, {
    status
  });
  return response.data.data;
}

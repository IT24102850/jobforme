import apiClient from './axios';
import { ApiResponse, JobApplication, SeekerProfile } from '../types';

export async function fetchSeekerProfile() {
  const response = await apiClient.get<ApiResponse<SeekerProfile>>('/api/seeker/profile');
  return response.data.data;
}

export async function updateSeekerProfile(payload: SeekerProfile) {
  const response = await apiClient.put<ApiResponse<SeekerProfile>>('/api/seeker/profile', payload);
  return response.data.data;
}

export async function uploadSeekerCv(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post<ApiResponse<SeekerProfile>>('/api/seeker/profile/cv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data;
}

export async function fetchSeekerApplications() {
  const response = await apiClient.get<ApiResponse<JobApplication[]>>('/api/seeker/applications');
  return response.data.data;
}

export async function applyToJob(jobId: string, payload: { coverLetter?: string }) {
  const response = await apiClient.post<ApiResponse<JobApplication>>(`/api/seeker/jobs/${jobId}/apply`, payload);
  return response.data.data;
}

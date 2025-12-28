import apiClient from './axios';
import { ApiResponse, Job, UserSummary } from '../types';

export async function fetchAdminUsers() {
  const response = await apiClient.get<ApiResponse<UserSummary[]>>('/api/admin/users');
  return response.data.data;
}

export async function disableUser(userId: string) {
  const response = await apiClient.patch<ApiResponse<UserSummary>>(`/api/admin/users/${userId}/disable`, {});
  return response.data.data;
}

export async function fetchAdminJobs() {
  const response = await apiClient.get<ApiResponse<Job[]>>('/api/admin/jobs');
  return response.data.data;
}

export async function deleteJob(jobId: string) {
  await apiClient.delete<ApiResponse<void>>(`/api/admin/jobs/${jobId}`);
}

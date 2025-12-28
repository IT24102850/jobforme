import apiClient from './axios';
import { ApiResponse, Job, PaginationResponse } from '../types';

export interface JobSearchParams {
  keyword?: string;
  location?: string;
  type?: string;
  skills?: string;
  page?: number;
  size?: number;
}

export async function fetchJobs(params: JobSearchParams = {}) {
  const searchParams = new URLSearchParams();
  if (params.keyword) searchParams.set('keyword', params.keyword);
  if (params.location) searchParams.set('location', params.location);
  if (params.type) searchParams.set('type', params.type);
  if (params.skills) searchParams.set('skills', params.skills);
  searchParams.set('page', String(params.page ?? 0));
  searchParams.set('size', String(params.size ?? 10));

  const response = await apiClient.get<ApiResponse<PaginationResponse<Job>>>(`/api/jobs?${searchParams.toString()}`);
  return response.data.data;
}

export async function fetchJob(jobId: string) {
  const response = await apiClient.get<ApiResponse<Job>>(`/api/jobs/${jobId}`);
  return response.data.data;
}

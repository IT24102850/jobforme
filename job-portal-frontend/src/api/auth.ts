import apiClient from './axios';
import { ApiResponse, AuthResponse, UserRole } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  role: UserRole;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function login(payload: LoginPayload) {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/login', payload);
  return response.data.data;
}

export async function register(payload: RegisterPayload) {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/register', payload);
  return response.data.data;
}

export async function requestPasswordReset(payload: ForgotPasswordPayload) {
  await apiClient.post<ApiResponse<unknown>>('/api/auth/password/forgot', payload);
}

export async function changePassword(payload: ChangePasswordPayload) {
  await apiClient.post<ApiResponse<unknown>>('/api/auth/password/change', payload);
}

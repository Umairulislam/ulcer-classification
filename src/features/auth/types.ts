export type UserRole = "admin" | "doctor"
export type UserStatus = "active" | "inactive"

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_no: string
  gender: string
  role: UserRole
  status: UserStatus
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  status: "idle" | "loading" | "authenticated" | "unauthenticated"
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginRawResponse {
  details: User
  extra: { access_token: string }
}

export interface LoginResult {
  user: User
  accessToken: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  otp: string
  new_password: string
}

export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}

export interface MessageResult {
  message: string
}

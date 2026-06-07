import { apiManager } from "@/helpers/apiManager"
import { LoginFormValues } from "@/schemas/loginSchema"
import { ResetFormValues } from "@/schemas/resetSchema"
import { ApiResponse, UserRecord } from "@/types/api"

interface ForgotPasswordPayload {
  email: string
}

export async function login(payload: LoginFormValues): Promise<ApiResponse<UserRecord>> {
  const { data } = await apiManager.post("auth/login", payload)
  return data
}

export async function forgotPassword(payload: ForgotPasswordPayload): Promise<ApiResponse<null>> {
  const { data } = await apiManager.post("auth/forgot-password", payload)
  return data
}

export async function resetPassword(payload: ResetFormValues): Promise<ApiResponse<null>> {
  const { data } = await apiManager.post("auth/reset-password", payload)
  return data
}

export async function logout(): Promise<ApiResponse<null>> {
  const { data } = await apiManager.post("auth/logout")
  return data
}

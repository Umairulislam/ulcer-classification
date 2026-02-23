import { apiManager } from "@/helpers/apiManager"

export async function login(payload) {
  const { data } = await apiManager.post("auth/login", payload)
  return data
}

export async function forgotPassword(payload) {
  const { data } = await apiManager.post("auth/forgot-password", payload)
  return data
}

export async function resetPassword(payload) {
  const { data } = await apiManager.post("auth/reset-password", payload)
  return data
}

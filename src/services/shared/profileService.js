import { apiManager } from "@/helpers/apiManager"

export async function updatePassword(payload) {
  const { data } = await apiManager.post("auth/change-password", payload)
  return data
}

export async function updateProfile(id, payload) {
  const { data } = await apiManager.patch(`doctor/update/${id}`, payload)
  return data
}

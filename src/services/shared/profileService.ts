import { apiManager } from "@/helpers/apiManager"
import { ApiResponse, UserRecord } from "@/types/api"
import { UpdatePassFormValues, UpdateProfileFormValues } from "@/schemas"

export async function updatePassword(payload: UpdatePassFormValues): Promise<ApiResponse<null>> {
  const { data } = await apiManager.post("auth/change-password", payload)
  return data
}

export async function updateProfile(
  id: string,
  payload: Partial<UpdateProfileFormValues>
): Promise<ApiResponse<UserRecord>> {
  const { data } = await apiManager.patch(`doctor/update/${id}`, payload)
  return data
}

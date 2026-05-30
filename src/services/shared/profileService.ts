import { apiManager } from "@/helpers/apiManager"
import { UpdatePassFormValues } from "@/schemas/updatePassSchema"
import { UpdateProfileFormValues } from "@/schemas/updateProfileSchema"
import { ApiResponse, UserRecord } from "@/types/api"

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

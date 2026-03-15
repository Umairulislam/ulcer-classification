import { apiManager } from "@/helpers/apiManager"
import { ApiResponse } from "@/types/api"

export async function classifyUlcer(
  patientId: string,
  imageFile: File
): Promise<ApiResponse<unknown>> {
  const formData = new FormData()
  formData.append("image", imageFile)

  const { data } = await apiManager.post(`patient/classify/upload/${patientId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return data
}

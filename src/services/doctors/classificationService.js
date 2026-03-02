import { apiManager } from "@/helpers/apiManager"

export async function classifyUlcer(patientId, imageFile) {
  const formData = new FormData()
  formData.append("image", imageFile)

  const { data } = await apiManager.post(`patient/classify/upload/${patientId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return data
}

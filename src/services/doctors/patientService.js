import { apiManager } from "@/helpers/apiManager"

export async function getPatientReports(patientId) {
  const { data } = await apiManager.post(`patient/get-all/reports/${patientId}`)
  return data
}

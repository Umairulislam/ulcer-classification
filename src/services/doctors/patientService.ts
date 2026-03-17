import { apiManager } from "@/helpers/apiManager"
import { ApiResponse, PatientReport } from "@/types/api"

export async function getPatientReports(patientId: string): Promise<ApiResponse<PatientReport[]>> {
  const { data } = await apiManager.post(`patient/get-all/reports/${patientId}`)
  return data
}

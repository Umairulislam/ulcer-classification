import { apiManager } from "@/helpers/apiManager"
import { ApiResponse, PatientRecord, PaginationParams } from "@/types/api"
import { PatientFormValues } from "@/schemas"

interface GetPatientsParams extends PaginationParams {
  doctor_id?: string
}

export async function getPatients(
  params: GetPatientsParams
): Promise<ApiResponse<PatientRecord[]>> {
  const queryParams: Record<string, unknown> = { page: params.page, perPage: params.perPage }
  if (params.search) queryParams.search = params.search
  if (params.doctor_id) queryParams.doctor_id = params.doctor_id

  const { data } = await apiManager.get("patient/all", { params: queryParams })
  return data
}

export async function getPatientById(id: string): Promise<ApiResponse<PatientRecord>> {
  const { data } = await apiManager.get(`patient/${id}`)
  return data
}

export async function createPatient(
  payload: PatientFormValues
): Promise<ApiResponse<PatientRecord>> {
  const { data } = await apiManager.post("patient/add", payload)
  return data
}

export async function updatePatient(
  id: string,
  payload: Partial<PatientFormValues>
): Promise<ApiResponse<PatientRecord>> {
  const { data } = await apiManager.patch(`patient/${id}`, payload)
  return data
}

export async function deletePatient(id: string): Promise<ApiResponse<null>> {
  const { data } = await apiManager.delete(`patient/${id}`)
  return data
}

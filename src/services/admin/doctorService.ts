import { apiManager } from "@/helpers/apiManager"
import { DoctorFormValues } from "@/schemas/doctorSchema"
import { ApiResponse, UserRecord, PaginationParams } from "@/types/api"

interface GetDoctorsParams extends PaginationParams {
  status?: string
}

export async function getDoctors(params: GetDoctorsParams): Promise<ApiResponse<UserRecord[]>> {
  const queryParams: Record<string, unknown> = { page: params.page, perPage: params.perPage }
  if (params.search) queryParams.search = params.search
  if (params.status && params.status !== "all") queryParams.status = params.status

  const { data } = await apiManager.get("doctor/all", { params: queryParams })
  return data
}

export async function getDoctorById(id: string): Promise<ApiResponse<UserRecord>> {
  const { data } = await apiManager.get(`doctor/${id}`)
  return data
}

export async function createDoctor(payload: DoctorFormValues): Promise<ApiResponse<UserRecord>> {
  const { data } = await apiManager.post("doctor/create", payload)
  return data
}

export async function updateDoctor(
  id: string,
  payload: Partial<DoctorFormValues>
): Promise<ApiResponse<UserRecord>> {
  const { data } = await apiManager.patch(`doctor/update/${id}`, payload)
  return data
}

export async function deleteDoctor(id: string): Promise<ApiResponse<null>> {
  const { data } = await apiManager.delete(`doctor/delete/${id}`)
  return data
}

export async function toggleDoctorStatus(
  id: string,
  currentStatus: string
): Promise<ApiResponse<UserRecord>> {
  const { data } = await apiManager.patch(`doctor/update/status/${id}`, {
    status: currentStatus === "active" ? "deactive" : "active",
  })
  return data
}

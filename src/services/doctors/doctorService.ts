import { apiManager } from "@/helpers/apiManager"
import { ApiResponse, AdminDashboardDetails } from "@/types/api"

export async function getDoctorDashboard(): Promise<ApiResponse<AdminDashboardDetails>> {
  const { data } = await apiManager.get("dashboard/doctor")
  return data
}

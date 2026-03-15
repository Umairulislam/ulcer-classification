import { apiManager } from "@/helpers/apiManager"
import { ApiResponse, AdminDashboardDetails } from "@/types/api"

export async function getAdminDashboard(): Promise<ApiResponse<AdminDashboardDetails>> {
  const { data } = await apiManager.get("dashboard/admin")
  return data
}

import { apiManager } from "@/helpers/apiManager"

export async function getAdminDashboard() {
  const { data } = await apiManager.get("dashboard/admin")
  return data
}

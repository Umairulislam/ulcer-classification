import { apiManager } from "@/helpers/apiManager"

export async function getDoctorDashboard() {
  const { data } = await apiManager.get("dashboard/doctor")
  return data
}

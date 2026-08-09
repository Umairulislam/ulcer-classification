import type { UserRole } from "@/features/auth/types"

export const DASHBOARD_BY_ROLE: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  doctor: "/doctor/dashboard",
}

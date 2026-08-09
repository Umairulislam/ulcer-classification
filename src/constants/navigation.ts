import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import type { SvgIconComponent } from "@mui/icons-material"
import type { UserRole } from "@/features/auth/types"

export interface NavItem {
  label: string
  href: string
  icon: SvgIconComponent
}

export const NAV_ITEMS_BY_ROLE: Record<UserRole, NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/admin/dashboard", icon: DashboardOutlinedIcon },
    { label: "Doctors", href: "/admin/doctors", icon: LocalHospitalOutlinedIcon },
    { label: "Patients", href: "/admin/patients", icon: PeopleAltOutlinedIcon },
  ],
  doctor: [
    { label: "Dashboard", href: "/doctor/dashboard", icon: DashboardOutlinedIcon },
    { label: "Patients", href: "/doctor/patients", icon: PeopleAltOutlinedIcon },
  ],
}

import { Metadata } from "next"
import DoctorDashboardPage from "./DoctorDashboardPage"

export const metadata: Metadata = { title: "Doctor Dashboard" }

export default function Page() {
  return <DoctorDashboardPage />
}

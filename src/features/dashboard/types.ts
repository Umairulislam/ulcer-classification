export interface AdminDashboardStats {
  total_doctor: number
  total_patients: number
  total_classification: number
}

export interface DoctorDashboardStats {
  total_patients: number
  total_classification: number
  total_pending_classification: number
}

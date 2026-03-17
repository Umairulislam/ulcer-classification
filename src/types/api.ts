// Shared pagination shape
export interface PaginationMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

// Base user shape (doctor/admin)
export interface UserRecord {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_no: string
  gender: "male" | "female" | "other"
  role: "admin" | "doctor"
  status: "active" | "deactive"
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// Patient shape
export interface PatientRecord {
  id: string
  patient_id: string
  name: string
  phone_no: string
  email: string
  age: string
  gender: "male" | "female" | "other"
  day: string
  time: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  user: UserRecord
}

// Dashboard shape
export interface AdminDashboardDetails {
  total_doctor: number
  total_patients: number
  total_classification: number
}

// Generic API response
export interface ApiResponse<T> {
  status: number
  message: string
  response: {
    details: T
    extra?: PaginationMeta
  }
}

// Pagination params
export interface PaginationParams {
  page: number
  perPage: number
  search?: string
}

export interface PatientReport {
  id: string
  pdf_path: string
  report_url: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ClassificationResult {
  prediction: string
}

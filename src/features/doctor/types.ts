import type { User } from "@/features/auth/types"

export type Doctor = User

export type DoctorStatus = "active" | "deactive"

export interface PaginationMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface GetDoctorsParams {
  search?: string
  page?: number
  perPage?: number
  status?: DoctorStatus | "all"
}

export interface MessageResult {
  message: string
}

export interface UpdateDoctorStatusRequest {
  id: string
  status: DoctorStatus
}

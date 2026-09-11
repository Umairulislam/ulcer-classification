import type { Doctor } from "@/features/doctor/types"

export interface Patient {
  id: string
  patient_id: string
  name: string
  phone_no: string
  email: string
  age: string
  gender: string
  day: string
  time: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  // The doctor this patient is assigned to — named `user` to match the
  // API's actual field name, not renamed for "clarity" so the shape
  // stays a direct match to what the backend sends.
  user: Doctor
}

export interface GetPatientsParams {
  search?: string
  page?: number
  perPage?: number
  doctor_id?: string
  patient_id?: string
}

export interface CreatePatientRequest {
  name: string
  email: string
  phone_no: string
  age: string
  gender: string
  doctor_id: string
}

// Same shape as create for patients (unlike doctor, no field is excluded
// on update) — aliased rather than redeclared so the two stay obviously
// in sync if the backend ever changes one.
export type UpdatePatientRequest = CreatePatientRequest

export interface UpdatePatientPayload {
  id: string
  data: UpdatePatientRequest
}

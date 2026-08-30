import { api, type ApiEnvelope } from "@/services/api"
import type { GetPatientsParams, Patient } from "./types"
import { PaginationMeta } from "@/types/api"

interface PatientListRaw {
  details: Patient[]
  extra: PaginationMeta
}

export interface PatientListResult {
  patients: Patient[]
  meta: PaginationMeta
}

export const patientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPatients: builder.query<PatientListResult, GetPatientsParams | void>({
      query: (params) => ({
        url: "patient/all",
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.doctor_id ? { doctor_id: params.doctor_id } : {}),
          ...(params?.patient_id ? { patient_id: params.patient_id } : {}),
        },
      }),
      transformResponse: (raw: ApiEnvelope<PatientListRaw>) => ({
        patients: raw.response.details,
        meta: raw.response.extra,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.patients.map((patient) => ({
                type: "Patient" as const,
                id: patient.id,
              })),
              { type: "Patient" as const, id: "LIST" },
            ]
          : [{ type: "Patient" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllPatientsQuery } = patientApi

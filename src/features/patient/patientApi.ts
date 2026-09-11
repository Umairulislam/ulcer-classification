import { api, type ApiEnvelope } from "@/services/api"
import type { MessageResult, PaginationMeta } from "@/types/api"
import type {
  CreatePatientRequest,
  GetPatientsParams,
  Patient,
  UpdatePatientPayload,
} from "./types"

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
          ...(params?.doctor_id && params.doctor_id !== "all"
            ? { doctor_id: params.doctor_id }
            : {}),
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

    // Used by the edit form to pre-fill fields — same tag as each list
    // row, so updating a patient refreshes both automatically.
    getPatientById: builder.query<Patient, string>({
      query: (id) => `patient/${id}`,
      transformResponse: (raw: ApiEnvelope<{ details: Patient }>) => raw.response.details,
      providesTags: (_result, _error, id) => [{ type: "Patient", id }],
    }),

    createPatient: builder.mutation<MessageResult, CreatePatientRequest>({
      query: (body) => ({
        url: "patient/add",
        method: "POST",
        body,
      }),
      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
      // A brand new patient has no existing tag — only LIST invalidation
      // makes the table refetch and pick it up.
      invalidatesTags: () => [{ type: "Patient", id: "LIST" }],
    }),

    updatePatient: builder.mutation<MessageResult, UpdatePatientPayload>({
      query: ({ id, data }) => ({
        url: `patient/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
      // Just this patient's own tag — refreshes both the list row and
      // the getPatientById query without refetching the whole list.
      invalidatesTags: (_result, _error, { id }) => [{ type: "Patient", id }],
    }),

    deletePatient: builder.mutation<MessageResult, string>({
      query: (id) => ({
        url: `patient/${id}`,
        method: "DELETE",
      }),
      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
      invalidatesTags: () => [{ type: "Patient", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi

import { api, type ApiEnvelope } from "@/services/api"
import type {
  CreateDoctorRequest,
  Doctor,
  GetDoctorsParams,
  MessageResult,
  PaginationMeta,
  UpdateDoctorPayload,
  UpdateDoctorStatusRequest,
} from "./types"

interface DoctorListRaw {
  details: Doctor[]
  extra: PaginationMeta
}

export interface DoctorListResult {
  doctors: Doctor[]
  meta: PaginationMeta
}

export const doctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query<DoctorListResult, GetDoctorsParams | void>({
      query: (params) => ({
        url: "doctor/all",
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.status && params.status !== "all" ? { status: params.status } : {}),
        },
      }),
      transformResponse: (raw: ApiEnvelope<DoctorListRaw>) => ({
        doctors: raw.response.details,
        meta: raw.response.extra,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.doctors.map((doctor) => ({
                type: "Doctor" as const,
                id: doctor.id,
              })),
              { type: "Doctor" as const, id: "LIST" },
            ]
          : [{ type: "Doctor" as const, id: "LIST" }],
    }),

    getDoctorById: builder.query<Doctor, string>({
      query: (id) => ({
        url: `doctor/${id}`,
      }),
      transformResponse: (raw: ApiEnvelope<{ details: Doctor }>) => raw.response.details,
      providesTags: (_result, _error, id) => [{ type: "Doctor", id }],
    }),

    createDoctor: builder.mutation<MessageResult, CreateDoctorRequest>({
      query: (body) => ({
        url: "doctor/create",
        method: "POST",
        body,
      }),
      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
      invalidatesTags: () => [{ type: "Doctor", id: "LIST" }],
    }),

    updateDoctor: builder.mutation<MessageResult, UpdateDoctorPayload>({
      query: ({ id, data }) => ({
        url: `doctor/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
      invalidatesTags: (_result, _error, { id }) => [{ type: "Doctor", id }],
    }),

    updateDoctorStatus: builder.mutation<MessageResult, UpdateDoctorStatusRequest>({
      query: ({ id, status }) => ({
        url: `doctor/update/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
      invalidatesTags: (_result, _error, { id }) => [{ type: "Doctor", id }],
    }),

    deleteDoctor: builder.mutation<MessageResult, string>({
      query: (id) => ({
        url: `doctor/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
      invalidatesTags: () => [{ type: "Doctor", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useUpdateDoctorStatusMutation,
  useDeleteDoctorMutation,
} = doctorApi

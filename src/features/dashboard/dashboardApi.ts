import { api, type ApiEnvelope } from "@/services/api"
import type { AdminDashboardStats, DoctorDashboardStats } from "./types"

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<AdminDashboardStats, void>({
      query: () => "dashboard/admin",
      transformResponse: (raw: ApiEnvelope<{ details: AdminDashboardStats }>) =>
        raw.response.details,
      providesTags: ["DashboardAdmin"],
    }),

    getDoctorDashboard: builder.query<DoctorDashboardStats, void>({
      query: () => "dashboard/doctor",
      transformResponse: (raw: ApiEnvelope<{ details: DoctorDashboardStats }>) =>
        raw.response.details,
      providesTags: ["DashboardDoctor"],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAdminDashboardQuery, useGetDoctorDashboardQuery } = dashboardApi

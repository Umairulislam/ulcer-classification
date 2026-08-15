import { api, type ApiEnvelope } from "@/services/api"
import type { AdminDashboardStats } from "./types"

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<AdminDashboardStats, void>({
      query: () => "dashboard/admin",
      transformResponse: (raw: ApiEnvelope<{ details: AdminDashboardStats }>) =>
        raw.response.details,
      providesTags: ["DashboardAdmin"],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAdminDashboardQuery } = dashboardApi

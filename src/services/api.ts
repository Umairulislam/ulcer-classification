import { RootState } from "@/store/store"
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import { logOut } from "@/features/auth/authSlice"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const TAG_TYPES = [
  "Auth",
  "Profile",
  "Doctor",
  "Patient",
  "PatientReport",
  "DashboardAdmin",
  "DashboardDoctor",
] as const

export type TagType = (typeof TAG_TYPES)[number]

export interface ApiEnvelope<T> {
  status: number
  message: string
  response: T
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set(`Authorization`, `Bearer ${token}`)
    }

    if (!headers.has("Content-Type") && !headers.has("content-type")) {
      headers.set("Accept", "application/json")
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    api.dispatch(logOut())
  }

  return result
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: TAG_TYPES,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
})

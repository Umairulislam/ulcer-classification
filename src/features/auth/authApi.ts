import { api, ApiEnvelope } from "@/services/api"
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRawResponse,
  LoginRequest,
  LoginResult,
  MessageResult,
  ResetPasswordRequest,
  User,
} from "./types"
import { logOut, setCredentials, setUser } from "./authSlice"

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResult, LoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),

      transformResponse: (raw: ApiEnvelope<LoginRawResponse>) => {
        const { details, extra } = raw.response
        return { user: details, accessToken: extra.access_token }
      },

      invalidatesTags: ["Auth", "Profile"],

      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials(data))
        } catch {}
      },
    }),

    getMe: builder.query<User, void>({
      query: () => ({
        url: "auth/get/me",
      }),

      transformResponse: (raw: ApiEnvelope<{ details: User }>) => raw.response.details,

      providesTags: ["Profile"],

      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch {
          dispatch(logOut())
        }
      },
    }),

    forgotPassword: builder.mutation<MessageResult, ForgotPasswordRequest>({
      query: (body) => ({
        url: "auth/forget-password",
        method: "POST",
        body,
      }),

      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
    }),

    resetPassword: builder.mutation<MessageResult, ResetPasswordRequest>({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body,
      }),

      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,
    }),

    changePassword: builder.mutation<MessageResult, ChangePasswordRequest>({
      query: (body) => ({
        url: "auth/change-password",
        method: "POST",
        body,
      }),

      transformResponse: (raw: ApiEnvelope<MessageResult>) => raw.response,

      invalidatesTags: ["Profile"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),

      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
        } finally {
          dispatch(logOut())
          dispatch(api.util.resetApiState())
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi

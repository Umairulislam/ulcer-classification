import { AppDispatch } from "@/store/store"
import { showToast } from "@/store/toastSlice"
import { UseFormSetError, FieldValues } from "react-hook-form"

export function handleApiError<T extends FieldValues>(
  error: unknown,
  dispatch: AppDispatch,
  setError?: UseFormSetError<T>
): void {
  const response = (error as { response?: { data?: { message?: string }; status?: number } })
    ?.response
  const { data, status } = response || {}

  switch (status) {
    case 422:
      if (setError && data) {
        Object.keys(data).forEach((field) => {
          setError(field as Parameters<UseFormSetError<T>>[0], {
            type: "manual",
            message: (data as Record<string, string>)[field],
          })
        })
      }
      break

    case 400:
    case 404:
      dispatch(showToast({ message: data?.message || "Request failed.", type: "error" }))
      break

    case 500:
      dispatch(showToast({ message: "Server error. Please try again later.", type: "error" }))
      break

    default:
      dispatch(showToast({ message: "Something went wrong. Please try again.", type: "error" }))
  }
}

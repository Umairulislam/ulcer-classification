import { showToast } from "@/store/toastSlice"

export function handleApiError(error, dispatch, setError = null) {
  const { data, status } = error?.response || {}

  switch (status) {
    // Validation Errors: loop through them
    case 422:
      if (setError && data) {
        Object.keys(data).forEach((field) => {
          setError(field, {
            type: "manual",
            message: data[field],
          })
        })
      }
      break

    // Show client errors
    case 400:
    case 404:
      dispatch(showToast({ message: data?.message || "Request failed.", type: "error" }))
      break

    // Show server Errors
    case 500:
      dispatch(showToast({ message: "Server error. Please try again later.", type: "error" }))
      break

    // Show unknown Errors
    default:
      dispatch(showToast({ message: "Something went wrong. Please try again.", type: "error" }))
  }
}

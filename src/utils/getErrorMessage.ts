export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string => {
  if (error && typeof error === "object") {
    // No response at all — server down, offline, CORS failure, etc.
    if ("status" in error && error.status === "FETCH_ERROR") {
      return "Couldn't reach the server. Please check your connection."
    }

    if ("data" in error) {
      const message = (error as { data?: { message?: string | string[] } }).data?.message
      // NestJS validation errors come back as an array of strings.
      if (Array.isArray(message)) return message.join(", ")
      if (message) return message
    }
  }
  return fallback
}

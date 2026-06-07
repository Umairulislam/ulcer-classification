export const decodeJwt = (token: string): Record<string, unknown> | null => {
  try {
    const [, payload] = token.split(".")
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    return JSON.parse(decodedPayload)
  } catch (error) {
    console.error("Failed to decode JWT:", error)
    return null
  }
}

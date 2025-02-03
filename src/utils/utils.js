// Utility function to decode a JWT token
export const decodeJwt = (token) => {
    try {
        // Split the token into its three parts
        const [header, payload, signature] = token.split(".")

        // Decode the payload (Base64 URL decode)
        const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))

        // Parse the decoded payload as JSON
        return JSON.parse(decodedPayload)
    } catch (error) {
        console.error("Failed to decode JWT:", error)
        return null
    }
}

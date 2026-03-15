import { z } from "zod"

const resetSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    otp_code: z.string().length(6, "OTP must be a 6-digit number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  })

export type ResetFormValues = z.infer<typeof resetSchema>
export default resetSchema

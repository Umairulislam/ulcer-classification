import { z } from "zod"

export const updatePassSchema = z
  .object({
    current_password: z.string().min(6, "Old Password must be at least 6 characters"),
    new_password: z.string().min(6, "New password must be at least 6 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password !== data.current_password, {
    message: "New password must be different from old password",
    path: ["new_password"],
  })
  .refine((data) => data.confirm_password === data.new_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  })

export type UpdatePassFormValues = z.infer<typeof updatePassSchema>

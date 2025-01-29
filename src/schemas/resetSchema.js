import * as yup from "yup"

const resetSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  otp_code: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be a 6-digit number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
})

export default resetSchema

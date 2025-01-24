import * as yup from "yup"

const createDoctorSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  phone_no: yup
    .string()
    .required("Phone Number is required")
    // .matches(/^[0-9]+$/, "Phone Number must contain only digits")
    .min(10, "Phone Number must be at least 10 digits"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Invalid gender"),
})

export default createDoctorSchema

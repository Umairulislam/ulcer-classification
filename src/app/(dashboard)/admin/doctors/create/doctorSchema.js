import * as yup from "yup"

const doctorSchema = (isUpdate) => {
  console.log("🚀 ~ doctorSchema ~ isUpdate:", isUpdate)
  return yup.object({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: isUpdate
      ? yup
          .string()
          .nullable()
          .test(
            "is-empty-or-valid",
            "Password must be at least 6 characters",
            (value) => value === null || value === "" || value?.length >= 6,
          )
      : yup
          .string()
          .nullable()
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
}
export default doctorSchema

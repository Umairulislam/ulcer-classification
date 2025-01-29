import * as yup from "yup"

const updatePassSchema = yup.object({
    old_password: yup
        .string()
        .required("Old Password is required")
        .min(6, "Old Password must be at least 6 characters"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .notOneOf([yup.ref("old_password"), null], "New password must be different from old password"),
    confirm_password: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
})

export default updatePassSchema
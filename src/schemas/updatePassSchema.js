import * as yup from "yup"

const updatePassSchema = yup.object({
    current_password: yup
        .string()
        .required("Old Password is required")
        .min(6, "Old Password must be at least 6 characters"),
    new_password: yup
        .string()
        .required("New password is required")
        .min(6, "New password must be at least 6 characters")
        .notOneOf([yup.ref("current_password"), null], "New password must be different from old password"),
    confirm_password: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("new_password"), null], "Passwords must match"),
})

export default updatePassSchema
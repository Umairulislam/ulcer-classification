"use client"

import React, { useState } from "react"
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material"
import { AxiosInstance, CustomButton } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { Email } from "@/assets/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
})

const ResetPassword = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const payload = { email: data.email }
    try {
      const { data } = await AxiosInstance.post(
        "/auth/forgot-password",
        payload,
      )
      dispatch(showToast({ message: data.message, type: "success" }))
      console.log("🚀 ~ onSubmit ~ data:", data)
    } catch (error) {
      dispatch(showToast({ message: error.response.data.email, type: "error" }))
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Reset Password
      </Typography>
      <Typography variant="body2" textAlign="center" mb={2}>
        Enter your registered email to receive an OTP for password reset.
      </Typography>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            placeholder="Enter your email"
            fullWidth
            error={errors.email}
            helperText={errors.email?.message}
            sx={{ marginBottom: "12px" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <CustomButton
        text="Send OTP"
        fullWidth
        type="submit"
        disabled={loading}
      />
    </Box>
  )
}

export default ResetPassword

// "use client"

// import React, { useState } from "react"
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Alert,
//   CircularProgress,
// } from "@mui/material"
// import { AxiosInstance } from "@/components"

// const ResetPassword = () => {
//   const [email, setEmail] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [successMessage, setSuccessMessage] = useState("")
//   const [errorMessage, setErrorMessage] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setErrorMessage("")
//     setSuccessMessage("")

//     try {
//       const { data } = await AxiosInstance.post("/auth/forgot-password", {
//         email,
//       }) // Adjust API endpoint
//       setSuccessMessage(
//         data.message || "OTP sent successfully, please check your email.",
//       )
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again.",
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: 400,
//         mx: "auto",
//         mt: 8,
//         p: 4,
//         boxShadow: 3,
//         borderRadius: 2,
//         backgroundColor: "background.paper",
//       }}
//     >
//       <Typography
//         variant="h5"
//         fontWeight="bold"
//         gutterBottom
//         textAlign="center"
//       >
//         Reset Password
//       </Typography>
//       <Typography variant="body2" textAlign="center" mb={2}>
//         Enter your registered email to receive an OTP for password reset.
//       </Typography>
//       {successMessage && (
//         <Alert severity="success" sx={{ mb: 2 }}>
//           {successMessage}
//         </Alert>
//       )}
//       {errorMessage && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {errorMessage}
//         </Alert>
//       )}
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Email Address"
//           type="email"
//           fullWidth
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           sx={{ mb: 3 }}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={loading}
//           sx={{ py: 1.5 }}
//         >
//           {loading ? (
//             <CircularProgress size={24} sx={{ color: "white" }} />
//           ) : (
//             "Send OTP"
//           )}
//         </Button>
//       </form>
//     </Box>
//   )
// }

// export default ResetPassword

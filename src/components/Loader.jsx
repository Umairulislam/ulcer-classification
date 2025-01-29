import { CircularProgress, Box } from "@mui/material"

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <CircularProgress color="primary" size={60} />
    </Box>
  )
}

export default Loader

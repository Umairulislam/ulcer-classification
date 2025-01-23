import { Box, Typography } from "@mui/material"
import Image from "next/image"
import { NoData } from "@/assets/images"

const NoRecordsFound = ({ title }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        borderRadius: "8px",
        marginTop: "40px",
      }}
    >
      <Image
        src={NoData}
        alt="No Data Available"
        width={250}
        height={250}
        style={{ marginBottom: "20px" }}
      />
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  )
}

export default NoRecordsFound

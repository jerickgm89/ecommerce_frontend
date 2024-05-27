import { Grid } from "@mui/material"
import { Footer, NavBar } from "../components"

export const EcommerceUI = ({children}) => {
  return (
    <>
        <NavBar />
        <Grid sx={{px: { xs: 1, sm: 2, md: 3, lg: 8 }}}>
          {children}
        </Grid>
        <Footer />
    </>
  )
}

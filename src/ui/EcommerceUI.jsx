import { Grid } from "@mui/material"
import { Footer, NavBar } from "../components"

export const EcommerceUI = ({children}) => {
  return (
    <>
        <NavBar />
        <Grid>
          {children}
        </Grid>
        <Footer />
    </>
  )
}

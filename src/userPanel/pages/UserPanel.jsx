import { Grid } from "@mui/material"

import { UserLayout } from "../layout/"
import { SideBarUser, UserInfo } from "../components"

export const UserPanel = () => {
  return (
    <UserLayout>
      <Grid container spacing={2}>
        <SideBarUser/>
        <UserInfo/>
      </Grid>
    </UserLayout>
  )
}

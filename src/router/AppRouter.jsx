import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/"
import { HomeRoutes } from "../home/routes/";

export const AppRouter = () => {
  return (
    <Routes>

        {/* Home */}
        <Route />
        <Route path="/*" element={ <HomeRoutes/>}/>

        {/* Products */}
        <Route />
        {/* <Route path="" element={ }/> */}

        {/* CartShopping */}
        <Route />
        {/* <Route path="" element={ }/> */}


        {/* Login y Registro */}
        <Route path="/auth/*" element={ <AuthRoutes/>}/>

    </Routes>
  )
}

import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/"
import { HomeRoutes } from "../home/routes/";
import { ProductsRoutes } from "../products/routes/"

export const AppRouter = () => {
  return (
    <Routes>

        {/* Home */}
        <Route />
        <Route path="/*" element={ <HomeRoutes/>}/>

        {/* Products */}
        
        <Route path="/products/*" element={ <ProductsRoutes/>}/>

        {/* CartShopping */}
        <Route />
        {/* <Route path="" element={ }/> */}


        {/* Login y Registro */}
        <Route path="/auth/*" element={ <AuthRoutes/>}/>

    </Routes>
  )
}

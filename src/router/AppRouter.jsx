import {  Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/";
import { HomeRoutes } from "../home/routes/";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";
import { ProductsRoutes } from "../products/routes/"

export const AppRouter = () => {
  return (
    <div>
      <NavBar />
      <Routes>

          {/* Home */}
          <Route path="/*" element={ <HomeRoutes /> }/>

          {/* Products */}
          {/* <Route path="/products" element={ <Products /> }/> */}
        {/* Products */}
        
        <Route path="/products/*" element={ <ProductsRoutes/>}/>

          {/* CartShopping */}
          {/* <Route path="/cartShopping" element={ <CartShopping /> }/> */}

          {/* Login y Registro */}
          <Route path="/auth/*" element={ <AuthRoutes /> }/>

      </Routes>
      <Footer />
    </div>
  )
}

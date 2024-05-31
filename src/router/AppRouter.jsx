import {  Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/";
import { HomeRoutes } from "../home/routes/";
import { ProductsRoutes } from "../products/routes/"
import { SearchRoutes } from "../search/routes";
import { AdminRoutes } from "../admin/routes";
import { UserRoutes } from "../userPanel/routes";
import { DetailsProductsPage } from "../products/pages";
import { CartShoppingRoutes } from "../cartShooping/routes/";
import { NotFoundRoutes } from "../notFound/routes";
import { PrivateRoute } from "../components/privateRoute/PrivateRoute";

export const AppRouter = () => {
  return (
    <div>
      <Routes>

          {/* Home */}
          <Route path="/" element={ <HomeRoutes /> }/>

          {/* Products */}        
          <Route path="/products/*" element={ <ProductsRoutes />}/>

          

          <Route path="/search/*" element={ <SearchRoutes/>}/>


          {/* CartShopping */}
          <Route path="/cartShopping" element={ <PrivateRoute><CartShoppingRoutes /></PrivateRoute> }/>

          {/* Login y Registro */}
          <Route path="/auth/*" element={ <AuthRoutes /> }/>

          {/* Admin */}
          <Route path="/admin/*" element={ <PrivateRoute requireEmailVerified={true}><AdminRoutes /></PrivateRoute> }/>

          {/* User */}
          <Route path="/user/*" element={ <PrivateRoute><UserRoutes /></PrivateRoute> }/>

          {/* DetailProduct */}
          <Route path="/products/details/:id" element={<DetailsProductsPage />} />

          {/* Not Found 404*/}
          <Route path="*" element={<NotFoundRoutes />} />

      </Routes>
    </div>
  )
}
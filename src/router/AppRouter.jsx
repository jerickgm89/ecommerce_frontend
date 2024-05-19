import {  Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/";
import { HomeRoutes } from "../home/routes/";
import { ProductsRoutes } from "../products/routes/"
import { SearchRoutes } from "../search/routes";
import { AdminRoutes } from "../admin/routes";
import { UserRoutes } from "../userPanel/routes";
import { DetailsProductsPage } from "../products/pages";
import { CartShoppingRoutes } from "../cartShooping/routes/";

export const AppRouter = () => {
  return (
    <div>
      <Routes>

          {/* Home */}
          <Route path="/*" element={ <HomeRoutes /> }/>

          {/* Products */}        
          <Route path="/products/*" element={ <ProductsRoutes/>}/>

          <Route path="/search/*" element={ <SearchRoutes/>}/>

          {/* CartShopping */}
          <Route path="/cartShopping" element={ <CartShoppingRoutes /> }/>

          {/* Login y Registro */}
          <Route path="/auth/*" element={ <AuthRoutes /> }/>

          {/* Admin */}
          <Route path="/admin/*" element={ <AdminRoutes /> }/>

          {/* User */}
          <Route path="/user" element={ <UserRoutes /> }/>

          {/* DetailProduct */}
          <Route path="/products/details/:id" element={<DetailsProductsPage />} />

      </Routes>
    </div>
  )
}

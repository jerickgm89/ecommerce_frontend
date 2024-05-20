import { Navigate, Route, Routes } from "react-router-dom"
import { AdminPages, CreateProductsPage, EditProductsPage, ListProductsPage, LockedProductsPage } from "../pages"

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ListProductsPage />} />
        <Route path="/createProducts" element={<CreateProductsPage />} />
        <Route path="/editProducts/:id" element={<EditProductsPage />} />
        <Route path="/lockedProducts" element={<LockedProductsPage />} />

        <Route path='/admin/*' element={ <Navigate to="/product/" /> } />
    </Routes>
  )
}

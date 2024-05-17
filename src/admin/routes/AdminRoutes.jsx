import { Navigate, Route, Routes } from "react-router-dom"
import { AdminPages, CreateProductsPage, ListProductsPage } from "../pages"

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ListProductsPage />} />
        <Route path="/createProducts" element={<CreateProductsPage />} />

        <Route path='/admin/*' element={ <Navigate to="/product/" /> } />
    </Routes>
  )
}

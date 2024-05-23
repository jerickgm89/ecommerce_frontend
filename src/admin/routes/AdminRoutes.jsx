import { Navigate, Route, Routes } from "react-router-dom"
import { AdminPages, CreateProductsPage, EditProductsPage, ListProductsPage, LockedProductsPage, ListUsersPage, LockedUsersPage } from "../pages"

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ListProductsPage />} />
        <Route path="/createProducts" element={<CreateProductsPage />} />
        <Route path="/editProducts/:id" element={<EditProductsPage />} />
        <Route path="/lockedProducts" element={<LockedProductsPage />} />
        <Route path="/users" element={<ListUsersPage />} />
        <Route path="/lockedUsers" element={<LockedUsersPage />} />

        <Route path='/admin/*' element={ <Navigate to="/product/" /> } />
    </Routes>
  )
}

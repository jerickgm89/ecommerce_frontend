import { Navigate, Route, Routes } from "react-router-dom"
import { AdminPages, CreateProductsPage, EditProductsPage, ListProductsPage, LockedProductsPage, ListUsersPage, LockedUsersPage, EditUsersPage, PostUsersPage } from "../pages"
import { ListQuestionsPage } from "../pages/ListQuestionsPage"

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ListProductsPage />} />
        <Route path="/createProducts" element={<CreateProductsPage />} />
        <Route path="/editProducts/:id" element={<EditProductsPage />} />
        <Route path="/lockedProducts" element={<LockedProductsPage />} />
        <Route path="/users" element={<ListUsersPage />} />
        <Route path="/lockedUsers" element={<LockedUsersPage />} />
        <Route path="/updateUsers/:id" element={<EditUsersPage />} />
        <Route path="/postUsers" element={<PostUsersPage />} />
        <Route path="/questions" element={<ListQuestionsPage />} />

        <Route path='/admin/*' element={ <Navigate to="/product/" /> } />
    </Routes>
  )
}

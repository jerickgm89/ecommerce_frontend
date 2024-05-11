import { Navigate, Route, Routes } from "react-router-dom"
import { AdminPages } from "../pages"

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminPages />} />

        <Route path='/admin/*' element={ <Navigate to="/products" /> } />   
    </Routes>
  )
}

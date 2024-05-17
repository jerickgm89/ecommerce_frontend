import { Navigate, Route, Routes } from "react-router-dom"
import { UserPanel } from "../pages"

export const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<UserPanel />} />
        <Route path='/*' element={ <Navigate to="/products" /> } />
    </Routes>
  )
}

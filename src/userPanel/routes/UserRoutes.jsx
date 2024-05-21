import { Navigate, Route, Routes } from "react-router-dom"
import { UserAddressPage, UserEditProfilePage, UserPanelPage, UserWishPage } from "../pages"

export const UserRoutes = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<UserPanelPage />} />
          <Route path="/address" element={<UserAddressPage />} />
          <Route path="/wishlist" element={<UserWishPage />} />
          <Route path="/editUser" element={<UserEditProfilePage />} />
          <Route path='/user/*' element={ <Navigate to="/products/" /> } />
      </Routes>
    </>
  )
}
 
import { Navigate, Route, Routes } from "react-router-dom"
import 
{ 
  UserEditProfilePage, 
  UserPanelPage, 
  UserWishPage, 
  UseAddAddressPage, 
  UserAddressPage, 
  UserOrderPage, 
  UserOrderDetailsPage
} 
  from "../pages"


export const UserRoutes = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<UserPanelPage />} />
          <Route path="/wishlist" element={<UserWishPage />} />
          <Route path="/editUser" element={<UserEditProfilePage />} />
          <Route path="/address" element={<UserAddressPage />} />
          <Route path="/addAddress" element={<UseAddAddressPage />} />
          <Route path="/order" element={<UserOrderPage />} />
          <Route path="/orderDetails" element={<UserOrderDetailsPage />} />
          <Route path='/*' element={ <Navigate to="/products/" /> } />
      </Routes>
    </>
  )
}
 
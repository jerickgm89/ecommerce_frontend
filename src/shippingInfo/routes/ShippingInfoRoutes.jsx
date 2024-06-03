import { Navigate, Route, Routes } from 'react-router-dom'
import { ShippingInfoPage } from '../pages'

export const ShippingInfoRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ShippingInfoPage />} />

        <Route path='/*' element={ <Navigate to="/shippingInfo" /> } />   
    </Routes>
  )
}



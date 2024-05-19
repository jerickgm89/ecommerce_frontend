import { Navigate, Route, Routes } from 'react-router-dom'
import { CartShoppingPage } from '../pages'

export const CartShoppingRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<CartShoppingPage />} />

        <Route path='/*' element={ <Navigate to="/products" /> } />   
    </Routes>
  )
}

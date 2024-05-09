import { Navigate, Route, Routes } from 'react-router-dom'
import { ProductsPage, DetailsProductsPage } from '../pages'

export const ProductsRoutes = () => {
  return (
    <Routes>
        <Route path="listProducts" element={<ProductsPage />} />
        <Route path="details/:productId" element={<DetailsProductsPage />} />

        <Route path='/*' element={ <Navigate to="/products" /> } />   
    </Routes>
  )
}



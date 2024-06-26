import { Navigate, Route, Routes } from 'react-router-dom'
import { ProductsPage, DetailsProductsPage } from '../pages'

export const ProductsRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ProductsPage />} />

        <Route path="/category/:idCategory" element={<ProductsPage />} />

        <Route path="/brand/:idBrand" element={<ProductsPage />} />

        <Route path='*' element={ <Navigate to="/products" /> } />   
    </Routes>
  )
}



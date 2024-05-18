import { Navigate, Route, Routes } from 'react-router-dom'
import { SearchPages } from '../pages'

export const SearchRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<SearchPages />} />

        <Route path='/*' element={ <Navigate to="/" /> } />   
    </Routes>
  )
}

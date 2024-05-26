import { NotFoundPage } from '../pages';
import { Route, Routes } from "react-router-dom";

export const NotFoundRoutes = () => {
    return (
        <Routes>
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
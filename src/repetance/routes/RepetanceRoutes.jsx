
import { Route, Routes } from 'react-router-dom';
import { RepetanceFormPage } from '../pages';

export const RepetanceRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<RepetanceFormPage/>} />
        </Routes>
    );
};


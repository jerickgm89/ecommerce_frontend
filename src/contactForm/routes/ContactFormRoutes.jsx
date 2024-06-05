
import { Route, Routes } from 'react-router-dom';
import { ContactFormPage } from '../pages';

export const ContactFormRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<ContactFormPage/>} />
        </Routes>
    );
};


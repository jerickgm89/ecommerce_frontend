import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCartRoute } from '../../store/cartRoute/cartRouteSlice';

const SaveCurrentRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Guarda la ruta actual en el estado
    dispatch(setCartRoute(location.pathname));
    // Redirige al usuario a la página de inicio de sesión
    navigate('/auth/login');
  }, [dispatch, location, navigate]);

  return children;
};

export default SaveCurrentRoute;
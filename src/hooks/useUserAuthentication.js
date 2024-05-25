import { useState, useEffect } from 'react';
import { usePostCreateUserMutation, useGetUserByEmailQuery, useGetTokenByEmailQuery, useGetUserByTokenQuery } from './../store/api/ecommerceUserApi';

export const useUserAuthentication = (user, isAuthenticated) => {
  const [createUser, {isLoading}] = usePostCreateUserMutation();
  const { data: existingUser, error } = useGetUserByEmailQuery(user?.email, { skip: !isAuthenticated });
  const doesUserExist = Boolean(existingUser);
  const { data: tokenData } = useGetTokenByEmailQuery(user?.email, { skip: !isAuthenticated || !doesUserExist });
  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  const { data: userData, refetch: refetchUserData } = useGetUserByTokenQuery(token); // Realizar la consulta

  useEffect(() => {
    if (isAuthenticated) {
      if (!doesUserExist && !isLoading) {
        console.log('Creating user...');
        let postDataUser = {
          email: user.email,
          email_verified: user.email_verified,
          family_name: user.family_name,
          given_name: user.given_name,
          picture: user.picture
        }
        createUser(postDataUser)
          .then(token => {
            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', token.data);
            console.log(token.data);
            // Refetch user data
            refetchUserData();
          })
          .catch(error => {
            // Manejar cualquier error que pueda ocurrir
            console.error(error);
          });
      } else if (doesUserExist) {
        console.log('User already exists');
        // Si el usuario ya existe, obtener el token
        console.log('User data:', userData);
      }
    }
  }, [isAuthenticated, doesUserExist, isLoading, token, refetchUserData]);

  return userData;
}
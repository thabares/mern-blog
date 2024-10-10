import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';
import Header from './Header';
import { AuthContext } from '../App';

const ProtectedRoute = () => {
  const { isAuthenticated, setIsAuthenticated, setUserInformation } =
    useContext(AuthContext); // null means still checking auth status

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const persistedAuth =
          localStorage.getItem('isAuthenticated') === 'true';
        if (persistedAuth) {
          setIsAuthenticated(true);
        } else {
          const userInformation = await axiosInstance.get('/auth/checkAuth');
          setUserInformation(userInformation.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show nothing or a loading spinner while authentication is being checked
  if (isAuthenticated === null) return <div>Loading...</div>;

  // If authenticated, render child routes; otherwise, redirect to login
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRoute;

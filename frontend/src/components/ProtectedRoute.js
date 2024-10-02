import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';
import Header from './Header';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means still checking auth status

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Attempt to access a protected endpoint to verify if the user is authenticated
        await axiosInstance.get('/auth/checkAuth'); // No need for withCredentials since it's already set in the API instance
        setIsAuthenticated(true);
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

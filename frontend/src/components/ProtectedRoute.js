import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';
import Header from './Header';
import { AuthContext } from '../App';
import styled from 'styled-components';

const MainContentWrapper = styled.main`
  flex-grow: 1; // Makes the main content take up the remaining space
  display: flex;
`;

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
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRoute;

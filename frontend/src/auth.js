import axios from 'axios';
import axiosInstance from './axiosInterceptor'; // Your axios interceptor setup

const API_URL = 'http://localhost:8080/api/auth'; // Adjust if needed

// Login Function: Handles login, tokens are stored in cookies
export const login = async (username, password) => {
  try {
    // Sending the login request, cookies will be automatically managed
    const response = await axios.post(
      `${API_URL}/login`,
      { username, password },
      { withCredentials: true }
    );

    // No need to store tokens manually, they will be stored in HTTP-only cookies
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (formValue) => {
  try {
    // Sending the login request, cookies will be automatically managed
    const response = await axios.post(`${API_URL}/register`, formValue, {
      withCredentials: true,
    });
    // No need to store tokens manually, they will be stored in HTTP-only cookies
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Protected Data: Handles requests to protected endpoints
export const fetchProtectedData = async () => {
  // No need to manually add the token; the cookie will automatically be sent with the request
  const response = await axiosInstance.get(`${API_URL}/protected`);
  return response.data;
};

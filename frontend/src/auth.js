import axios from 'axios';
import axiosInstance from './axiosInterceptor'; // Your axios interceptor setup
import { API_URL } from './baseUrl';

// Login Function: Handles login, tokens are stored in cookies
export const login = async ({ username, password }) => {
  try {
    // Sending the login request, cookies will be automatically managed
    const response = await axios.post(
      `${API_URL}/api/auth/login`,
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
    const response = await axios.post(
      `${API_URL}/api/auth/register`,
      formValue,
      {
        withCredentials: true,
      }
    );
    // No need to store tokens manually, they will be stored in HTTP-only cookies
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Protected Data: Handles requests to protected endpoints
export const fetchProtectedData = async () => {
  // No need to manually add the token; the cookie will automatically be sent with the request
  const response = await axiosInstance.get(`${API_URL}/api/auth/protected`);
  return response.data;
};

export const createPosts = async (content) => {
  const response = await axiosInstance.post(`${API_URL}/api/post/create-post`, {
    content,
  });
  return response.data;
};

export const getPosts = async () => {
  const response = await axiosInstance.get(`${API_URL}/api/post`);

  return response.data;
};

export const bookmarkPost = async (postId) => {
  const response = await axiosInstance.post(
    `${API_URL}/post/${postId}/bookmark`
  );

  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`${API_URL}/api/post/${postId}`);
  return response.data;
};

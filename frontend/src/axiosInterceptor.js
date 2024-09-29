import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // Include cookies in requests
});

// Response interceptor to handle access token expiration and refresh token logic
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Pass through successful responses
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token (401 Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite loop
      console.log('Access token expired, attempting to refresh token');

      try {
        // Attempt to refresh the access token
        const { data } = await axios.post(
          'http://localhost:8080/api/auth/token',
          {},
          { withCredentials: true }
        );

        console.log('Successfully refreshed token:', data);

        // Retry the original request with the new token if applicable
        return axiosInstance(originalRequest); // Retry original request
      } catch (err) {
        console.log('Error refreshing token:', err);
        if (err.response && err.response.status === 403) {
          alert('Session expired, please log in again.');
          // Redirect to the login page using window.location
          window.location.href = '/login';
        }
      }
    } else {
      alert('Unexpected error, redirecting to login.');
      // Redirect for other errors as well
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

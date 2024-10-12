import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mern-blog-xu6a.onrender.com/api',
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
          'https://mern-blog-xu6a.onrender.com/api/auth/token',
          {},
          { withCredentials: true }
        );

        console.log('Successfully refreshed token:', data);

        // Retry the original request with the new token if applicable
        return axiosInstance(originalRequest); // Retry original request
      } catch (err) {
        console.log('Error refreshing token:', err);
        if (err.response && err.response.status === 403) {
          alert('Session expired, logging you out...');
          // Log out the user by clearing local storage/session data
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userInformation');
          // Redirect to login page
          window.location.href = '/login';
        }
      }
    } else if (error.response && error.response.status === 403) {
      // Handle forbidden error (e.g., refresh token invalid)
      alert('Session expired, logging you out...');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userInformation');
      window.location.href = '/login';
    } else if (!error.response) {
      // Network or server error (no response received)
      console.error('Network or server error:', error.message);
      alert('Network error, please try again later.');
    } else {
      // Handle other types of errors (e.g., 500 internal server error)
      console.error('Unexpected error:', error.message);
      alert('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

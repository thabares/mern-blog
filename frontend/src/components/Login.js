import React, { useState } from 'react';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [username, setUsername] = useState('thabares');
  const [password, setPassword] = useState('thabares');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      // Debugging: Check if res contains the expected structure
      console.log('API Response:', res);

      // Since tokens are stored in cookies, we don't need to save them in local storage
      alert('Logged in successfully!');
      navigate('/'); // Redirect to the desired route after login
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type='password'
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;

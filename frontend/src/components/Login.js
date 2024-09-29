import React, { useState } from 'react';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InputField from './InputField';
import Upload from './Upload';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email) ? 'Invalid email address' : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
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
    <>
      <Upload />
      <form onSubmit={handleSubmit}>
        <InputField
          label='Email'
          type='email'
          name='email'
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          validate={validateEmail}
          required={true}
        />
        <InputField
          label='Password'
          type='password'
          name='password'
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          required={true}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default Login;

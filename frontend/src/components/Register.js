import React, { useState } from 'react';
import axios from 'axios';
import { register } from '../auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register();
      alert('User registered successfully!'); // Notify user of success
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.'); // Notify user of failure
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;

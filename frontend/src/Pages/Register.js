import React, { useState } from 'react';
import axios from 'axios';
import { register } from '../auth';
import Header from '../components/Header';
import styled from 'styled-components';
import { ImAccessibility } from 'react-icons/im';

const Wrapper = styled.section``;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 8rem);

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const IconWrapper = styled.div`
  color: #bf4f74;
  width: 50vw;
  font-size: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    font-size: 20vh;
    width: 100vw;
  }
`;

const FormWrapper = styled.div``;

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
    <Wrapper>
      <Header />
      <ContentWrapper>
        <IconWrapper>
          <ImAccessibility />
        </IconWrapper>
        <FormWrapper>
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
        </FormWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Register;

import React, { useContext, useEffect, useState } from 'react';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Upload from '../components/Upload';
import styled from 'styled-components';
import { FiSunset } from 'react-icons/fi';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { RiLoginBoxFill } from 'react-icons/ri';
import Toaster from '../components/Toaster';
import { AuthContext } from '../App';

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

const FormWrapper = styled.form`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormHeader = styled.h2`
  font-weight: 800;
  color: #bf4f74;
`;

const Login = () => {
  const [formFields, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); // Access isAuthenticated from AuthContext

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home if the user is already authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleFormFields = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formFields);
      // Debugging: Check if res contains the expected structure
      // Since tokens are stored in cookies, we don't need to save them in local storage
      Toaster.sucess('Logged in successfully!');
      navigate('/'); // Redirect to the desired route after login
    } catch (error) {
      console.error(error);
      Toaster.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Wrapper>
        <Header />
        <ContentWrapper>
          <IconWrapper>
            <FiSunset />
          </IconWrapper>
          <FormWrapper onSubmit={handleSubmit} autoComplete='hidden'>
            <FormHeader>Login</FormHeader>
            <InputField
              placeholder='Username / Email'
              label='Username / Email'
              name='username'
              onChange={handleFormFields}
              value={formFields.username}
              required={true}
            />
            <InputField
              type='password'
              label='Password'
              name='password'
              placeholder='Password'
              value={formFields.password}
              onChange={handleFormFields}
              required={true}
            />
            <Button type='submit' label='Login' icon={<RiLoginBoxFill />} />
          </FormWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default Login;

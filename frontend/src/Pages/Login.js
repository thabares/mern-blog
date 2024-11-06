import React, { useContext, useEffect, useState } from 'react';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSunset } from 'react-icons/fi';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { RiLoginBoxFill } from 'react-icons/ri';
import Toaster from '../components/Toaster';
import { AuthContext } from '../App';

const Wrapper = styled.section``;

const ContentWrapper = styled.main`
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

const validationConfig = {
  username: {
    required: true,
    messages: {
      required: 'Username/Email is required.',
      pattern: 'Invalid username/email format.',
    },
    pattern: /^\S+@\S+\.\S+|^[a-zA-Z0-9]+$/, // Accepts either email or alphanumeric username
  },
  password: {
    required: true,
    minLength: 8,
    messages: {
      required: 'Password is required.',
      minLength: 'Password must be at least 8 characters long.',
    },
  },
};

const Login = () => {
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleFormFields = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const validateFields = () => {
    const newErrors = {};

    Object.keys(validationConfig).forEach((field) => {
      const config = validationConfig[field];
      const value = formFields[field];

      // Required check
      if (config.required && !value) {
        newErrors[field] = config.messages.required;
        return;
      }

      // Length check for password
      if (
        field === 'password' &&
        config.minLength &&
        value.length < config.minLength
      ) {
        newErrors[field] = config.messages.minLength;
        return;
      }

      // Pattern check for username/email
      if (
        field === 'username' &&
        config.pattern &&
        !config.pattern.test(value)
      ) {
        newErrors[field] = config.messages.pattern;
        return;
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent form submission
    }

    try {
      const res = await login(formFields);
      Toaster.sucess('Logged in successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      Toaster.error(
        error.response.data.msg ??
          'Login failed. Please check your credentials.'
      );
    }
  };

  return (
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
            error={errors.username} // Pass error message if exists
          />
          <InputField
            type='password'
            label='Password'
            name='password'
            placeholder='Password'
            value={formFields.password}
            onChange={handleFormFields}
            error={errors.password} // Pass error message if exists
          />
          <Button type='submit' label='Login' icon={<RiLoginBoxFill />} />
        </FormWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Login;

import React, { useContext, useEffect, useState } from 'react';
import { register } from '../auth';
import Header from '../components/Header';
import styled from 'styled-components';
import { FaRegistered } from 'react-icons/fa';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Toaster from '../components/Toaster';
import { FiSunset } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
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

  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const FormHeader = styled.h2`
  font-weight: 800;
  color: #bf4f74;
`;

const validationConfig = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    messages: {
      required: 'Full Name is required.',
      minLength: 'Full Name must be at least 2 characters.',
      pattern: 'Full Name can only contain letters.',
    },
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 15,
    pattern: /^[a-zA-Z0-9]+$/,
    messages: {
      required: 'Username is required.',
      minLength: 'Username must be between 3 and 15 characters.',
      maxLength: 'Username must be at most 15 characters.',
      pattern: 'Username can only contain letters and numbers.',
    },
  },
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
    messages: {
      required: 'Email is required.',
      pattern: 'Email is invalid.',
    },
  },
  password: {
    required: true,
    minLength: 8,
    messages: {
      required: 'Password is required.',
      minLength: 'Password must be at least 8 characters long.',
      custom:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
    },
  },
  confirmPassword: {
    required: true,
    messages: {
      required: 'Confirm Password is required.',
      match: 'Passwords do not match.',
    },
  },
};

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [formFields, setFormFields] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleFormFields = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
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

      // Length checks
      if (config.minLength && value.length < config.minLength) {
        newErrors[field] = config.messages.minLength;
        return;
      }
      if (config.maxLength && value.length > config.maxLength) {
        newErrors[field] = config.messages.maxLength;
        return;
      }

      // Pattern check
      if (config.pattern && !config.pattern.test(value)) {
        newErrors[field] = config.messages.pattern;
        return;
      }

      // Custom checks (for password confirmation)
      if (field === 'confirmPassword' && value !== formFields.password) {
        newErrors[field] = config.messages.match;
        return;
      }

      // Special checks for password complexity
      if (field === 'password') {
        if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) {
          newErrors[field] = config.messages.custom;
        }
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
      const res = await register(formFields);
      Toaster.sucess('User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      Toaster.error('Registration failed. Please try again.');
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
          <FormHeader>Register</FormHeader>
          <InputField
            placeholder='Fullname'
            label='Fullname'
            name='fullName'
            onChange={handleFormFields}
            value={formFields.fullName}
            error={errors.fullName}
          />
          <InputField
            placeholder='Username'
            label='Username'
            name='username'
            onChange={handleFormFields}
            value={formFields.username}
            error={errors.username}
          />
          <InputField
            type='email'
            placeholder='Email'
            label='Email'
            name='email'
            onChange={handleFormFields}
            value={formFields.email}
            error={errors.email}
          />
          <InputField
            type='password'
            label='Password'
            name='password'
            placeholder='Password'
            onChange={handleFormFields}
            value={formFields.password}
            error={errors.password}
          />
          <InputField
            type='password'
            placeholder='Confirm password'
            label='Confirm password'
            name='confirmPassword'
            onChange={handleFormFields}
            value={formFields.confirmPassword}
            error={errors.confirmPassword}
          />
          <Button type='submit' label='Register' icon={<FaRegistered />} />
        </FormWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Register;

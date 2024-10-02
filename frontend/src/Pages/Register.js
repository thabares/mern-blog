import React, { useState } from 'react';
import { register } from '../auth';
import Header from '../components/Header';
import styled from 'styled-components';
import { FaRegistered } from 'react-icons/fa';
import { ImAccessibility } from 'react-icons/im';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Toaster from '../components/Toaster';

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

const Register = () => {
  const [formFields, setFormFields] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleFormFields = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formFields);
      Toaster.sucess('User registered successfully!'); // Notify user of success
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
        <FormWrapper onSubmit={handleSubmit} autoComplete='hidden'>
          <FormHeader>Register</FormHeader>
          <InputField
            placeholder='Fullname'
            label='Fullname'
            name='fullName'
            onChange={handleFormFields}
            required={true}
            value={formFields.fullName}
          />
          <InputField
            placeholder='Username'
            label='Username'
            name='username'
            onChange={handleFormFields}
            required={true}
          />
          <InputField
            type='email'
            placeholder='Email'
            label='Email'
            name='email'
            onChange={handleFormFields}
            required={true}
          />
          <InputField
            type='password'
            label='Password'
            name='password'
            placeholder='Password'
            onChange={handleFormFields}
            required={true}
          />
          <InputField
            type='password'
            placeholder='Confirm password'
            label='Confirm password'
            name='confirmPassword'
            onChange={handleFormFields}
            required={true}
          />
          <Button type='submit' label='Register' icon={<FaRegistered />} />
        </FormWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Register;

import styled from 'styled-components';
import { FaRegistered } from 'react-icons/fa';
import { RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useContext } from 'react';
import { AuthContext } from '../App';
import axiosInstance from '../axiosInterceptor';

const Title = styled.h1`
  font-size: 1.5em;
  font-family: Marker Felt, cursive;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 1em;
  color: #bf4f74;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
`;

const AuthWrapper = styled.section`
  display: flex;
`;

const Button = styled.button`
  margin-left: 1rem;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 1.1rem;
  color: #bf4f74;
  padding: 0px;
`;

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const logout = async () => {
    try {
      // Call the logout API to remove the refresh token from the server
      await axiosInstance.post('/auth/logout');

      // Clear local authentication data (localStorage)
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userInformation');

      // Redirect user to login page after logout
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
      alert('Logout failed, please try again.');
    }
  };

  return (
    <Wrapper>
      <Title>BLOG</Title>
      <AuthWrapper>
        {!isAuthenticated && (
          <Button title='Register' onClick={() => navigate('/register')}>
            <FaRegistered />
          </Button>
        )}
        {!isAuthenticated && (
          <Button title='Login' onClick={() => navigate('/login')}>
            <RiLoginBoxFill />
          </Button>
        )}
        {isAuthenticated && (
          <Button title='Logout' onClick={() => logout()}>
            <RiLogoutBoxFill />
          </Button>
        )}
      </AuthWrapper>
    </Wrapper>
  );
};
export default Header;

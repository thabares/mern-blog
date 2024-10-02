import styled from 'styled-components';
import { FaRegistered } from 'react-icons/fa';
import { RiLoginBoxFill } from 'react-icons/ri';

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
  return (
    <Wrapper>
      <Title>BLOG</Title>
      <AuthWrapper>
        <Button title='Register'>
          <FaRegistered />
        </Button>
        <Button title='Login'>
          <RiLoginBoxFill />
        </Button>
      </AuthWrapper>
    </Wrapper>
  );
};
export default Header;

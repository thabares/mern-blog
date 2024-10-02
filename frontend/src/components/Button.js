import styled from 'styled-components';

const ButtonWrapper = styled.div`
  width: 30vw;
`;

const ButtonElement = styled.button`
  background-color: #bf4f74;
  font-weight: 800;
  color: #fff;
  border: none;
  border-radius: 0.3rem;
  height: 2rem;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  margin-top: 2px;
`;

const Button = ({ type = 'button', label = { label }, icon }) => {
  return (
    <ButtonWrapper>
      <ButtonElement type={type}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {label}
      </ButtonElement>
    </ButtonWrapper>
  );
};
export default Button;

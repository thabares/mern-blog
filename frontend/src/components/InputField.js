import styled from 'styled-components';

const InputElement = styled.input`
  height: 2rem;
  outline: none;
  border: none;
  border: 1px solid #bf4f74;
  margin-top: 0.6rem;
  width: 100%;
  text-indent: 10px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
`;

const InputElementContainer = styled.div`
  margin-bottom: 1rem;
  width: 30vw;
  font-family: Arial, Helvetica, sans-serif !important;
`;

const InputLabel = styled.label`
  color: #bf4f74;
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;

const InputField = ({
  type = 'text',
  placeholder,
  onChange,
  label,
  required,
  name,
  value,
  error, // New error prop
}) => {
  return (
    <InputElementContainer>
      {label && (
        <InputLabel>
          {label} {required && '*'}
        </InputLabel>
      )}
      <InputElement
        type={type}
        autoComplete='hidden'
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required
        value={value}
      />
      {error && (
        <span style={{ color: '#bf4f74', fontSize: '0.8rem' }}>{error}</span>
      )}{' '}
      {/* Display error */}
    </InputElementContainer>
  );
};

export default InputField;

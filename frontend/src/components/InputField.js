import React, { useState, useEffect } from 'react';
import './InputField.css';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  validate,
  required = false,
}) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false); // State to track if the input has been touched

  const handleBlur = () => {
    setTouched(true); // Mark the input as touched
    if (required && !value) {
      setError(`${label} is required`);
    } else if (validate) {
      const validationError = validate(value);
      setError(validationError);
    } else {
      setError('');
    }
  };

  useEffect(() => {
    if (touched) {
      // Validate if the field has been touched
      if (required && !value) {
        setError(`${label} is required`);
      } else if (validate) {
        const validationError = validate(value);
        setError(validationError);
      } else {
        setError('');
      }
    }
  }, [value, touched, validate, required, label]);

  return (
    <div className='input-field'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        required={required}
        aria-invalid={!!error} // Accessibility improvement
      />
      {touched && error && (
        <div
          className='error'
          style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;

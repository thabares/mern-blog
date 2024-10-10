import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import Styled from 'styled-components';

const AppWrapper = Styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWrapper>
    <App />
    <ToastContainer />
  </AppWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

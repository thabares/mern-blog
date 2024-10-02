/* eslint-disable default-case */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster = {
  sucess: async function (message, position = 'top-right') {
    toast.success(message, {
      position: position,
      autoClose: 3000,
      closeButton: false,
      newestOnTop: true,
      pauseOnHover: false,
      backgroundColor: 'red',
      theme: 'colored',
      hideProgressBar: true,
      progress: undefined,
      style: {
        background: '#bf4f74',
      },
    });
  },
  error: async function (message, position = 'top-right') {
    toast.error(message, {
      position: position,
      autoClose: 3000,
      closeButton: false,
      newestOnTop: true,
      pauseOnHover: false,
      backgroundColor: 'red',
      theme: 'colored',
      hideProgressBar: true,
      progress: undefined,
      style: {
        background: '#bf4f74',
      },
    });
  },
  warn: async function (message, position = 'top-right') {
    toast.warn(message, {
      position: position,
      autoClose: 3000,
      closeButton: false,
      newestOnTop: true,
      pauseOnHover: false,
      backgroundColor: 'red',
      theme: 'colored',
      hideProgressBar: true,
      progress: undefined,
      style: {
        background: '#bf4f74',
      },
    });
  },
  info: async function (message, position = 'top-right') {
    toast.info(message, {
      position: position,
      autoClose: 3000,
      closeButton: false,
      newestOnTop: true,
      pauseOnHover: false,
      backgroundColor: 'red',
      theme: 'colored',
      hideProgressBar: true,
      progress: undefined,
      style: {
        background: '#bf4f74',
      },
    });
  },
  custom: async function (message, position = 'top-left') {},
};
export default Toaster;

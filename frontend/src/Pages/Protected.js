import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchProtectedData } from '../auth';

const Protected = () => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const fetchProtectedAPIData = async () => {
      try {
        const response = await fetchProtectedData();
        setUserId(response?.user?.id || '');
      } catch (error) {
        // window.location.href = '/login';
        console.error('Error fetching protected data:', error);
      }
    };
    fetchProtectedAPIData();
  }, []);
  return <div>{userId} protected</div>;
};
export default Protected;

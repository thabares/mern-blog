import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../baseUrl';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // Store the base64 string
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, {
        file,
      });
      setImageUrl(response.data.url);
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(`${API_URL}api/delete`, {
        url: imageUrl,
      });
      console.log('response delete', response);
    } catch (err) {
      console.log('Error deleting file', err);
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <img src={imageUrl} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default Upload;

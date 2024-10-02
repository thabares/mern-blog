const express = require('express');
const { uploadImages, deleteImages } = require('../utils/upload');
const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    const file = req.body.file;
    const imageUrl = await uploadImages(file, 'users');
    res.json({ url: imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

router.post('/delete', async (req, res) => {
  try {
    const result = await deleteImages(req.body.url);
    let response;
    if (result.result === 'ok') {
      response = 'successfully deleted';
    } else {
      response = 'failed delete';
    }
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: 'Image delete failed', error });
  }
});

module.exports = router;

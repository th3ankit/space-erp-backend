const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadPhotos } = require('../controllers/uploadController');

// Multer setup to handle memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to handle photo upload
router.post('/', upload.array('photos', 3), uploadPhotos);

module.exports = router;

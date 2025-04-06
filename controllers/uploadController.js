const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPhotos = async (req, res) => {
  try {
    const uploadedImages = [];

    for (const file of req.files) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(file.buffer);
        });
      };

      const result = await streamUpload(file);
      uploadedImages.push(result.secure_url);
    }

    res.status(200).json({
      message: 'Uploaded successfully',
      photos: uploadedImages,
    });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
};

module.exports = { uploadPhotos };

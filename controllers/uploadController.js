const Report = require('../models/Report');
const cloudinary = require('cloudinary').v2;

exports.uploadReport = async (req, res) => {
  try {
    console.log("✅ Received Body:", req.body);
    console.log("✅ Received Files:", req.files);

    const { school, date, activity, comments } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedPhotos = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      uploadedPhotos.push(result.secure_url);
    }

    const report = new Report({
      school: school || "N/A",
      date: date || new Date(),
      activity: activity || "N/A",
      comments: comments || "",
      photos: uploadedPhotos,
    });

    await report.save();

    console.log("✅ Report Saved:", report);

    res.status(200).json({ message: 'Uploaded successfully', report });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const uploadReport = async (req, res) => {
  try {
    const { schoolName, date, activity, comments } = req.body;
    const photos = req.files.map(file => file.path);

    if (!schoolName || !date || !activity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const report = new Report({
      schoolName,
      date,
      activity,
      comments,
      photos,
    });

    await report.save();

    res.status(200).json({
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

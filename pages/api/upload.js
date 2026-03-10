import { upload } from "@/app/multer";

// Disable Next.js body parsing so Multer can handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadSingle = upload.single("file");

  uploadSingle(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err.message || "Upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // File is stored in /uploads on the server
    const fileUrl = `/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      filename: req.file.originalname,
      storedFilename: req.file.filename,
      url: fileUrl,
    });
  });
}


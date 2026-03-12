import fs from "fs";
import path from "path";
import multer from "multer";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");// getting its path to join and upload;


if (!fs.existsSync(uploadDir)) { //checking if it exists 
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({  // multer configuration
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

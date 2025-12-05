import multer from "multer";
import cloudinary from "./cloudinary.js";
import streamifier from "streamifier";

// Temporary storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to upload to Cloudinary
const uploadToCloudinary = (folder) => async (req, res, next) => {
  if (!req.file) return next();

  const stream = cloudinary.uploader.upload_stream(
    { folder },
    (error, result) => {
      if (error) return next(error);
      req.file.cloudinaryUrl = result.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

export { upload, uploadToCloudinary };

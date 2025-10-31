import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "studyvault_materials",
      resource_type: "raw", // ✅ ensures PDFs, DOCXs, PPTXs are handled properly
      allowed_formats: ["pdf", "jpg", "docx", "pptx"],
      public_id: file.originalname.split(".")[0], // optional, keeps filenames readable
    };
  },
});

const upload = multer({ storage });

export default upload;

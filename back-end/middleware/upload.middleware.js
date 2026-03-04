import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storageEquipment = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, "_");
    return {
      folder: "equipment",
      public_id: `${timestamp}-${originalName}`,
      allowed_formats: ["jpg", "png", "jpeg"],
    };
  },
});

export const storageUser = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, "_");
    return {
      folder: "user",
      public_id: `${timestamp}-${originalName}`,
      allowed_formats: ["jpg", "png", "jpeg"],
    };
  },
});

export const uploadEquipment = multer({ storage: storageEquipment });
export const uploadUser = multer({ storage: storageUser });

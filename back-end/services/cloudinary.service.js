import cloudinary from "../config/cloudinary.config.js";

export default async function deletePhoto(photo) {
  try {
    const photoCloudinary = photo
      .split("/upload/")[1]
      .replace(/^v\d+\//, "")
      .replace(/\.[^/.]+$/, "");
    await cloudinary.uploader.destroy(photoCloudinary);
  } catch (err) {
    console.log(err);
  }
}

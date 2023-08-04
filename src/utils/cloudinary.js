import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryUpload = async (image) => {
  if (!image) return "";
  try {
    const formData = new FormData(); //khi upload file cần đặt trong formdata
    formData.append("file", image); // tạo trường tên là file chứa image
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = res.data.secure_url; //secure_url đường link bắt đầu bằng https
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

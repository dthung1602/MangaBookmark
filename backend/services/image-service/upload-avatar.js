import cloudinary from "cloudinary";
import { User } from "../../models/index.js";

const uploadOptions = {
  transformation: [
    {
      width: 64,
      height: 64,
      crop: "scale",
    },
  ],
};
export default (function (userId, filePath) {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(filePath, uploadOptions, async (apiError, result) => {
      try {
        if (apiError) {
          throw apiError;
        }
        await User.findByIdAndUpdate(userId, { avatar: result.secure_url });
        resolve({
          status: "success",
          url: result.secure_url,
          error: "",
        });
      } catch (error) {
        resolve({
          status: "error",
          url: "",
          error: error.toString(),
        });
      }
    });
  });
});

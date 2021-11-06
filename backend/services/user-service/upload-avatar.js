const cloudinary = require("cloudinary").v2;
const { User } = require("../../models");

const uploadOptions = {
  transformation: [
    {
      width: 64,
      height: 64,
      crop: "scale",
    },
  ],
};

module.exports = function (userId, filePath) {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(filePath, uploadOptions, async (apiError, result) => {
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
};

const multer = require("multer");
const AWS = require("aws-sdk");
const path = require("path");
const multerS3 = require("multer-s3");
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mov" ||
    file.mimetype === "video/wmv" ||
    file.mimetype === "video/avi"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

AWS.config.update({
  region: "us-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();
const allowedExtensions = [".png", ".jpg", "jpeg", ".bmp"];
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "instagramdb",
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? "";
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(
        null,
        new Date().toISOString().replace(/:/g, "-") + "," + file.originalname
      );
    },
    acl: "public-read-write",
  }),
}).array("file");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "," + file.originalname
    );
  },
});

module.exports = { imageUploader, fileFilter, fileStorage };

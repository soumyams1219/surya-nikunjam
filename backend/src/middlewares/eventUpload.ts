import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = path.join(
  __dirname,
  "../../uploads/events"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const ext = path.extname(
      file.originalname
    );

    cb(null, Date.now() + ext);
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb
) => {
  if (
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed.")
    );
  }
};

export default multer({
  storage,
  fileFilter,
});
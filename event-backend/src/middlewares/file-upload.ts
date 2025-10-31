import multer from "multer";
import path from "path";

//untuk upload file atau foto agar tidak pakai data dummy lagi dan menentukan file mana yg akan digunakan untuk menyimpan foto atau file
export const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const uniqueName = `EVENT-${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),

  //untuk filter file apa saja yg ingin di upload
  fileFilter(req, file, cb) {
    const allowTypes = /jpg|jpeg|png|svg|webp|gif|avif/;
    const extName = path.extname(file.originalname);
    const isTypeValid = allowTypes.test(extName);

    if (isTypeValid) {
      cb(null, true);
    } else {
      cb(new Error("Only image file are allowed"));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});

// // src/routes/upload.route.ts
// import express from "express";
// import { fileUpload } from "../middlewares/file-upload.js";
// import { cloudinary } from "../configs/cloudinary.config.js";
// import streamifier from "streamifier";

// const router = express.Router();

// router.post(
//   "/eventImg",
//   fileUpload.single("photoProfile"),
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }

//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: "event_images" }, // folder di cloudinary
//         (error, result) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).json({ message: "Upload failed", error });
//           }
//           res.status(200).json({
//             message: "Upload successful",
//             url: result?.secure_url,
//           });
//         }
//       );

//       // kirim buffer file ke Cloudinary
//       streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// );

// export default router;

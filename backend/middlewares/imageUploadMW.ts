// Package Imports
import multer, { FileFilterCallback } from "multer";
import { NextFunction, Request, Response } from "express";

// Config Imports
import { cloudinary } from "../configs/cloudinaryConfig";

const uploadPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (!file || file.mimetype.split("/")[0] != "image") {
      return cb(new Error("Only images allowed"));
    }
    cb(null, true);
  },
});

const uploadToCloudinary = (
  buffer: Buffer,
  options = {}
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });
};

const resizeAndUploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Step 1")
  console.log(req.body)
  if (!req.files || req.files.length === 0) return next();
  console.log("Step 2")
  try {
    console.log(req.files)
    console.log('Reseize')
    //@ts-ignore
    const uploadPromises = req.files.map(
      (file: Express.Multer.File) =>
        uploadToCloudinary(file.buffer, {})
    );
    const results = (await Promise.all(uploadPromises)) as [
      { url: string }
    ];
    req.imageUrls = results.map((result) => result.url);
    
    next();
  } catch (error) {
    console.log("error Occured in reseize and upload")
    next(error);
  }
};

export { uploadPhoto, resizeAndUploadImage };

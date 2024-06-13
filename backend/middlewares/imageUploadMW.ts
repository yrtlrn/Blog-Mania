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

const resizeAndUploadImageArray = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || req.files.length === 0) return next();
  try {
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
    console.log("Error Occured in reseize and upload");
    next(error);
  }
};

const resizeAndUploadImageSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();
  try {
    //@ts-ignore
    const uploadFile = req.file as Express.Multer.File;

    const result = (await uploadToCloudinary(
      uploadFile.buffer,
      {}
    )) as {url: string};

    // const results = (await Promise.all(uploadPromises)) as [
    //   { url: string }
    // ];

    req.imageUrls = [result.url];
    next();
  } catch (error) {
    console.log("Error Occured in reseize and upload");
    next(error);
  }
};

export {
  uploadPhoto,
  resizeAndUploadImageArray,
  resizeAndUploadImageSingle,
};

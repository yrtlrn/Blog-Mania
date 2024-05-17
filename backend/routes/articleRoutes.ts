// Packages Imports
import express from "express";

import {
  createArticle,
  getAllArticles,
} from "../controllers/articleControllers";

import {
  uploadPhoto,
  resizeAndUploadImage,
} from "../middlewares/imageUploadMW";

const router = express.Router();

router
  .route("/")
  .get(getAllArticles)
  .post(
    uploadPhoto.array("imageFiles", 6),
    resizeAndUploadImage,
    createArticle
  );

export default router;

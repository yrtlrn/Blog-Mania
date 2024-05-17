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
import { authCheck } from "../utils/authCheck";

const router = express.Router();

router
  .route("/")
  .get(getAllArticles)
  .post(
    authCheck,
    uploadPhoto.array("imageFiles", 6),
    resizeAndUploadImage,
    createArticle
  );

export default router;

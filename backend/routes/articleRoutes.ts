// Packages Imports
import express from "express";

// Controllers Imports
import {
  commentOnArticle,
  createArticle,
  editComment,
  getAllArticles,
  getTagArticles,
  likeOrUnlikeArticle,
} from "../controllers/articleControllers";

// Middleware Imports
import {
  uploadPhoto,
  resizeAndUploadImage,
} from "../middlewares/imageUploadMW";

// Utils Imports
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

router.get("/search/tag", getTagArticles);

router.post("/like", authCheck, likeOrUnlikeArticle);
router.post("/comment", authCheck, commentOnArticle)
router.put("/comment/edit", authCheck, editComment)


export default router;

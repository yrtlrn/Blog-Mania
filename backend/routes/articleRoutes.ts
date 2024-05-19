// Packages Imports
import express from "express";

// Controllers Imports
import {
  commentOnArticle,
  createArticle,
  deleteComment,
  editComment,
  getAllArticles,
  getFollowingArticles,
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
router.delete("/comment/delete", authCheck, deleteComment)
router.get("/following", authCheck, getFollowingArticles)


export default router;

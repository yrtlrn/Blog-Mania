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
  resizeAndUploadImageArray,
} from "../middlewares/imageUploadMW";

// Utils Imports
import { authCheck } from "../middlewares/authCheck";

// Validators Imports
import { articleIdValidator } from "../middlewares/validation/userValidation";
import {
  getAllArticlesValidator,
  createArticleValidator,
  commentOnArticleValidator,
  editCommentValidator,
} from "../middlewares/validation/articleValidations";

const router = express.Router();

router
  .route("/")
  .get(getAllArticlesValidator, getAllArticles)
  .post(
    authCheck,
    uploadPhoto.array("imageFiles", 6),
    resizeAndUploadImageArray,
    createArticleValidator,
    createArticle
  );

router.get("/search/tag", getTagArticles);

router.post(
  "/like",
  authCheck,
  articleIdValidator,
  likeOrUnlikeArticle
);
router.post(
  "/comment",
  authCheck,
  commentOnArticleValidator,
  commentOnArticle
);
router.put(
  "/comment/edit",
  authCheck,
  editCommentValidator,
  editComment
);
router.delete(
  "/comment/delete",
  authCheck,
  articleIdValidator,
  deleteComment
);
router.get("/following", authCheck, getFollowingArticles);

export default router;

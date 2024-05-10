// Package Imports
import express from "express";

// Controllers Imports
import {
  editProfile,
  editSetting,
  loginUser,
  profileData,
  registerUser,
  removeArticle,
  saveArticleToUser,
  savedArticles,
  settingData,
} from "../controllers/userControllers";

// Utilis Import
import { authCheck } from "../utils/authCheck";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private Routes
router
  .route("/user/profile")
  .get(authCheck, profileData)
  .post(authCheck, editProfile);

router
  .route("/user/setting")
  .get(authCheck, settingData)
  .post(editSetting);

router.get("/user/articles", authCheck, savedArticles);
router.post(
  "/user/article/save",
  authCheck,
  saveArticleToUser
);
router.delete(
  "/user/article/remove",
  authCheck,
  removeArticle
);

export default router;

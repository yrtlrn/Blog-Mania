// Package Imports
import express from "express";

// Controllers Imports
import {
  addToFollowing,
  editProfile,
  editSetting,
  followersList,
  followingList,
  loginUser,
  logoutUser,
  profileData,
  registerUser,
  removeArticle,
  removeFromFollowing,
  saveArticleToUser,
  savedArticles,
  settingData,
} from "../controllers/userControllers";

// Utilis Import
import { authCheck } from "../utils/authCheck";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
// todo - when frontend is built, check if session expires on window close
router.post("/login", loginUser);

// Private Routes
router.post("/logout", authCheck, logoutUser);

router
  .route("/profile")
  .get(authCheck, profileData)
  .post(authCheck, editProfile);

router
  .route("/setting")
  .get(authCheck, settingData)
  .post(editSetting);

router.get("/articles", authCheck, savedArticles);
router.post("/article/save", authCheck, saveArticleToUser);
router.delete("/article/remove", authCheck, removeArticle);

// todo - Need to check the routes below
router.get("/followers", authCheck, followersList);
router.get("/following", authCheck, followingList);
router.post("/following/add", authCheck, addToFollowing);
router.post(
  "/following/remove",
  authCheck,
  removeFromFollowing
);

export default router;

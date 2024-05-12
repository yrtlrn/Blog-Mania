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

// todo - Need to check the routes below
router.get("/user/followers", authCheck, followersList);
router.get("/user/following", authCheck, followingList);
router.post(
  "/user/following/add",
  authCheck,
  addToFollowing
);
router.post(
  "/user/following/remove",
  authCheck,
  removeFromFollowing
);

export default router;

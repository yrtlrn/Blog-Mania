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
  userAuthCheck,
} from "../controllers/userControllers";

// Utilis Import
import { authCheck } from "../middlewares/authCheck";

// Validators Imports
import {
  loginValidator,
  registerValidator,
  editProfileValidator,
  editSettingValidator,
  articleIdValidator,
  userIdValidator,
} from "../middlewares/validation/userValidation";

const router = express.Router();

// Public Routes
router.post("/register", registerValidator, registerUser);
// todo - when frontend is built, check if session expires on window close
router.post("/login", loginValidator, loginUser);

// Private Routes
router.post("/logout", authCheck, logoutUser);
router.get("/auth-check", authCheck, userAuthCheck);

router
  .route("/profile")
  .get(authCheck, profileData)
  .put(authCheck, editProfileValidator, editProfile);

router
  .route("/setting")
  .get(authCheck, settingData)
  .put(authCheck, editSettingValidator, editSetting);

router.get("/articles", authCheck, savedArticles);

router.post(
  "/article/save",
  authCheck,
  articleIdValidator,
  saveArticleToUser
);
router.delete(
  "/article/remove",
  authCheck,
  articleIdValidator,
  removeArticle
);

// todo - Need to check the routes below
router.get("/followers", authCheck, followersList);
router.get("/following", authCheck, followingList);
router.post(
  "/following/add",
  authCheck,
  userIdValidator,
  addToFollowing
);
router.post(
  "/following/remove",
  authCheck,
  userIdValidator,
  removeFromFollowing
);

export default router;

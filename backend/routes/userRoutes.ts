// Package Imports
import express, {
  NextFunction,
  Request,
  Response,
} from "express";
// Controllers Imports
import {
  addToFollowing,
  editProfile,
  editSetting,
  followersList,
  followingList,
  loginUser,
  logoutUser,
  accountData,
  registerUser,
  removeArticle,
  removeFromFollowing,
  saveArticleToUser,
  savedArticles,
  settingData,
  userAuthCheck,
  profileData,
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
  authorValidator,
  profileDataValidator,
} from "../middlewares/validation/userValidation";
import {
  uploadPhoto,
  resizeAndUploadImageSingle,
} from "../middlewares/imageUploadMW";

const router = express.Router();

// Public Routes
router.post(
  "/register",
  uploadPhoto.single("profilePic"),
  resizeAndUploadImageSingle,
  registerValidator,
  registerUser
);
// todo - when frontend is built, check if session expires on window close
router.post("/login", loginValidator, loginUser);
router.get("/profile", profileDataValidator, profileData);

// Private Routes
router.post("/logout", authCheck, logoutUser);
router.get("/auth-check", authCheck, userAuthCheck);

router
  .route("/account")
  .get(authCheck, accountData)
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
  "/following/follow",
  authCheck,
  authorValidator,
  addToFollowing
);
router.delete(
  "/following/unfollow",
  authCheck,
  authorValidator,
  removeFromFollowing
);

export default router;

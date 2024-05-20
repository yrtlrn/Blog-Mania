// Package Imports
import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

// Model Imports
import User from "../models/userModel";

// Utils Imports
import { createSession } from "../utils/createSession";

// todo - when frontend is built, check if session expires on window close
// DESC     Login in user
// ROUTE    POST /api/v1/login
// ACCESS   Public
const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Empty fileds check
    if (!username && !email) {
      res.status(400);
      throw new Error("Please enter a username or email");
    }
    if (!password) {
      res.status(400);
      throw new Error("Please enter your password");
    }

    // Find user
    let user;
    if (username) {
      user = await User.findOne({ username: username });
    } else {
      user = await User.findOne({ email: email });
    }

    // If user not found
    if (!user) {
      res.status(401);
      throw new Error("User does not exist");
    }

    if (await user.checkpassword(password)) {
      createSession(req, user._id, user.username);
      if (req.body.remember) {
        req.session.cookie.maxAge = 14 * 24 * 3600000; // 2 Weeks
      } else {
        //@ts-ignore
        req.session.cookie.expires = false;
      }
      res
        .status(200)
        .json({ message: "User Log In Successful" });
      return;
    } else {
      res.status(400);
      if (username) {
        throw new Error(
          "Username or Password is Incorrect"
        );
      } else {
        throw new Error("Email or Password is Incorrect");
      }
    }
  }
);

// DESC     Register a user
// ROUTE    POST /api/v1/register
// ACCESS   Public
const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password
    ) {
      res.status(400);
      throw new Error(
        "Please enter all the required fields"
      );
    }

    // Check if duplicate email
    const dupEmail = await User.findOne({ email: email });
    if (dupEmail) {
      res.status(400);
      throw new Error("Please enter a different Email");
    }

    // Check if duplicate username
    const dupUsername = await User.findOne({
      username: username,
    });
    if (dupUsername) {
      res.status(400);
      throw new Error("Please enter a different Username");
    }

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    if (newUser) {
      createSession(req, newUser._id, newUser.username);
      res
        .status(201)
        .json({ message: "User created Sucessfully" });
    } else {
      res
        .status(400)
        .json({ message: "Something went wrong" });
    }
  }
);

// DESC     Logout a User
// ROUTE    POST /api/v1/logout
// ACCESS   Private
const logoutUser = asyncHandler(
  async (req: Request, res: Response) => {
    await userCheck(req, res);
    req.session.destroy((err) => {});
    res.clearCookie("sessionCookie");
    res.status(200).json({ message: "Logout Successful" });
  }
);

// DESC     Send user's profile data
// ROUTE    GET /api/v1/user/profile
// ROUTE    GET /api/v1/user/profile
// ACCESS   Private
const profileData = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(
      req.session.userId
    ).select("firstName lastName email");

    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }
);

// DESC     Update user's profile data
// ROUTE    PUT /api/v1/user/profile
// ACCESS   Private
const editProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      username,
      email,
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword) {
      res.status(400);
      throw new Error("Please enter your password");
    }

    const user = await userCheck(req, res);

    const duplicateEmail = await User.findOne({
      email: email,
      _id: { $ne: req.session.userId },
    });

    if (duplicateEmail) {
      res.status(400);
      throw new Error("Please select a different email");
    }
    const duplicateUsername = await User.findOne({
      username: username,
      _id: { $ne: req.session.userId },
    });

    if (duplicateUsername) {
      res.status(400);
      throw new Error("Please select a different username");
    }

    if (await user.checkpassword(currentPassword)) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.username = username;
      if (newPassword) {
        console.log("Password Update");
        await User.findByIdAndUpdate(
          req.session.userId,
          {
            password: newPassword,
          },
          { runValidators: true }
        );
      }
      const userSaved = await user.save();

      if (userSaved) {
        res
          .status(200)
          .json({ message: "Profile Update Successful" });
      } else {
        res.status(500);
        throw new Error("Something went wrong");
      }
    } else {
      res.status(400);
      throw new Error("Incorrect Password");
    }
  }
);

// DESC     Get user's settings
// ROUTE    GET /api/v1/user/setting
// ACCESS   Private
const settingData = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userCheck(req, res);

    res.status(200).json({ data: user.perferences });
  }
);

// DESC    Edit user's settings
// ROUTE    POST /api/v1/user/setting
// ACCESS   Private
const editSetting = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      contentDisplay,
      accountVisibility,
      hideFollowers,
      hideFollowing,
    } = req.body;

    await userCheck(req, res);

    if (
      contentDisplay.toLowerCase() !== "left" &&
      contentDisplay.toLowerCase() !== "right" &&
      contentDisplay.toLowerCase() !== "center"
    ) {
      res.status(400);
      throw new Error(
        "Content Display must equal left,right, or center"
      );
    }

    if (
      accountVisibility.toLowerCase() !== "public" &&
      accountVisibility.toLowerCase() !== "private"
    ) {
      res.status(400);
      throw new Error(
        "Account Visibility must equal public or private"
      );
    }

    if (
      hideFollowers.toLowerCase() !== "true" &&
      hideFollowers.toLowerCase() !== "false"
    ) {
      res.status(400);
      throw new Error(
        "Hide Followers must equal true or false"
      );
    }

    if (
      hideFollowing.toLowerCase() !== "true" &&
      hideFollowing.toLowerCase() !== "false"
    ) {
      res.status(400);
      throw new Error(
        "Hide Following must equal true or false"
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId,
      { perferences: req.body },
      { runValidators: true }
    );

    console.log(req.body);

    if (updatedUser) {
      res
        .status(200)
        .json({ message: "Setting Update Successful" });
    } else {
      res
        .status(500)
        .json({ message: "Something went wrong" });
    }
  }
);

// DESC     Get user's saved articles
// ROUTE    GET /api/v1/user/articles
// ACCESS   Private
const savedArticles = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userCheck(req, res);

    res.status(200).json({ data: user.savedArticles });
  }
);

// DESC     Save an article
// ROUTE    POST /api/v1/user/article/save
// ACCESS   Private
const saveArticleToUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userCheck(req, res);

    if (!req.body.articleId) {
      res.status(400);
      throw new Error("No article id");
    }

    if (user.savedArticles.includes(req.body.articleId)) {
      res.status(400);
      throw new Error("Article already saved");
    }
    user.savedArticles.push(req.body.articleId);
    const updatedUser = await user.save();
    if (updatedUser) {
      res.status(200).json({ message: "Article Saved" });
    } else {
      res.status(500);
      throw new Error("Something went wrong");
    }
  }
);

// DESC     Remove an article
// ROUTE    DELETE /api/v1/user/article/delete
// ACCESS   Private
const removeArticle = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userCheck(req, res);

    if (!req.body.articleId) {
      res.status(400);
      throw new Error("No article id");
    }

    if (!user.savedArticles.includes(req.body.articleId)) {
      res.status(400);
      throw new Error("This article is not saved");
    }

    const index = user.savedArticles.indexOf(
      req.body.articleId
    );

    if (index > -1) {
      user.savedArticles.splice(index, 1);
    }

    const updatedUser = await user.save();

    if (updatedUser) {
      res.status(200).json({ message: "Article Removed" });
    } else {
      res.status(500);
      throw new Error("Something went wrong");
    }
  }
);

// DESC     Get user's follwers list
// ROUTE    DELETE /api/v1/user/followers
// ACCESS   Private
const followersList = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userCheck(req, res);
    res.status(200).json({ data: user.followers });
  }
);

// DESC     Get user's following list
// ROUTE    DELETE /api/v1/user/following
// ACCESS   Private
const followingList = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userCheck(req, res);

    res.status(200).json({ data: user.following });
  }
);

// DESC    Add to User's Following List
// ROUTE   POST /api/v1/user/following/add
// ACCESS  Private
const addToFollowing = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userCheck(req, res);
    if (!req.body.userId) {
      res.status(400);
      throw new Error("Following User's Id not found");
    }

    const followUser = await User.findById(req.body.userId);

    if (!followUser) {
      res.status(404);
      throw new Error("Follow User does not exist");
    }

    if (user.following.includes(req.body.userId)) {
      res.status(400);
      throw new Error("Already following");
    }

    user.following.push(req.body.userId);

    const updatedUser = await user.save();

    if (!updatedUser) {
      res.status(500);
      throw new Error("Something went wrong");
    }

    if (updatedUser) {
      if (
        !followUser.followers.includes(req.session.userId!)
      ) {
        followUser.followers.push(req.session.userId!);
        const followUserSave = await followUser.save();
        if (followUserSave) {
          res.status(200).json({
            message: `Following ${followUserSave.username}`,
          });
        } else {
          res.status(500);
          throw new Error("Something went wrong");
        }
      }
    } else {
      res
        .status(500)
        .json({ message: "Something went wrong" });
    }
  }
);

// DESC    Unfollow another user
// ROUTE   POST /api/v1/user/following/remove
// ACCESS  Private
const removeFromFollowing = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userCheck(req, res);
    const followUser = await User.findById(req.body.userId);
    if (!followUser) {
      res.status(404);
      throw new Error("Follow User does not exist");
    }

    if (!user.following.includes(req.body.userId)) {
      res.status(400);
      throw new Error("Not following this user");
    }

    if (
      !followUser.followers.includes(req.session.userId!)
    ) {
      res.status(400);
      throw new Error("You do not follow this user");
    }

    const index = user.following.indexOf(req.body.userId);

    user.following.splice(index, 1);

    const userSaved = await user.save();

    if (userSaved) {
      const followUserIndex = followUser.followers.indexOf(
        req.session.userId!
      );
      followUser.followers.splice(followUserIndex, 1);

      const followUserSaved = await followUser.save();

      if (followUserSaved) {
        res.status(200).json({
          message: `Unfollowed ${followUser.username}`,
        });
      } else {
        res.status(500);
        throw new Error("");
      }
    } else {
      res.status(500);
      throw new Error("Something went wrong");
    }
  }
);

export {
  registerUser,
  loginUser,
  logoutUser,
  profileData,
  editProfile,
  settingData,
  editSetting,
  savedArticles,
  saveArticleToUser,
  removeArticle,
  followersList,
  followingList,
  addToFollowing,
  removeFromFollowing,
};

//? Other Functions
const userCheck = async (req: Request, res: Response) => {
  const user = await User.findById(req.session.userId);
  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  } else {
    return user;
  }
};

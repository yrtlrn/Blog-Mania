// Package Imports
import { Request, Response, json } from "express";
import asyncHandler from "express-async-handler";

// Model Imports
import User from "../models/userModel";

// Utils Imports
import { createSession } from "../utils/createSession";

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
      createSession(req, user._id);
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

// DESC     Send user's profile data
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
// ROUTE    POST /api/v1/user/profile
// ACCESS   Private
const editProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword) {
      res.status(400);
      throw new Error("Please enter your password");
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

    const duplicateEmail = await User.findOne({
      email: email,
      _id: { $ne: req.session.userId },
    });

    if (duplicateEmail) {
      res.status(400);
      throw new Error("Please select a different email");
    }

    if (await user.checkpassword(currentPassword)) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
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
    const user = await User.findById(req.session.userId);

    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

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
    const user = await User.findById(req.session.userId);
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

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
    const user = await User.findById(req.session.userId);

    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

    res.status(200).json({ data: user.savedArticles });
  }
);

// DESC     Save an article
// ROUTE    POST /api/v1/user/article/save
// ACCESS   Private
const saveArticleToUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.session.userId);
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

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
    const user = await User.findById(req.session.userId);
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

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

export {
  registerUser,
  loginUser,
  profileData,
  editProfile,
  settingData,
  editSetting,
  savedArticles,
  saveArticleToUser,
  removeArticle,
};

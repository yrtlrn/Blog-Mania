// Package Imports
import { Request, Response } from "express";
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
// ROUTE    Get /api/v1/user/profile
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

export { registerUser, loginUser,profileData };

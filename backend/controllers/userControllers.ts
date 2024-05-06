// Package Imports
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Model Imports
import User from "../models/userModel";

// DESC     Login in user
// ROUTE    POST /api/v1/login
// ACCESS   Public
const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.body.type === "username") {
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
      password
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



export {registerUser}

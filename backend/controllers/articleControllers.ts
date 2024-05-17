// Package Imports
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Model Import
import Article from "../models/articleModel";
import User from "../models/userModel";
import { Types } from "mongoose";

// DESC    Get all articles
// ROUTE   GET /api/v1/articles
// ACCESS  Public
const getAllArticles = asyncHandler(
  async (req: Request, res: Response) => {
    const article = await Article.find({});

    if (!article) {
      res.status(404);
      throw new Error("Articles not found");
    } else {
      res.status(200).json({ data: article });
    }
  }
);

// DESC    Create a new article
// ROUTE   POST /api/v1/articles
// ACCESS  Private
const createArticle = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, tag, otherPeople, content } = req.body;

    if (!title || !tag || !content) {
      res.status(400);
      throw new Error(
        "Please enter all the required fields"
      );
    }

    if (
      tag !== "Games" &&
      tag !== "Music" &&
      tag !== "Movie" &&
      tag !== "Tech" &&
      tag !== "Cooking" &&
      tag !== "Other"
    ) {
      res.status(400);
      throw new Error(
        "Please select a tag from the given list"
      );
    }

    const getUserIds = async (usernameList: [string]) => {
      const otherUsers: any = [];
      for (const user of usernameList) {
        const userFound = await User.findOne({
          username: user,
        }).select("_id");
        if (userFound) {
          otherUsers.push(userFound._id);
        } else {
          otherUsers.push("Not Found");
        }
      }

      return otherUsers;
    };

    let userList: Types.ObjectId[] = [];

    if (otherPeople) {
      const otherUserArray = otherPeople.split(",");
      const result: [string] = await getUserIds(
        otherUserArray
      );
      for (const id of result) {
        if (id === "Not Found") {
          res.status(400);
          throw new Error(
            `${
              otherUserArray[result.indexOf("Not Found")]
            } not found`
          );
        } else {
          userList.push(id as unknown as Types.ObjectId);
        }
      }
    }

    const createdArtilce = await Article.create({
      title: title,
      author: req.session.userId,
      tag: tag,
      otherPeople: otherPeople ? userList : null,
      content: content,
      media: req.imageUrls,
    });

    if (!createdArtilce) {
      res.status(500);
      throw new Error("Something went wrong");
    } else {
      res
        .status(201)
        .json({ message: "Article Created" });
    }
  }
);

export { getAllArticles, createArticle };

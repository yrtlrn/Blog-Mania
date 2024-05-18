// Package Imports
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Model Import
import Article from "../models/articleModel";
import User from "../models/userModel";
import { Types } from "mongoose";
import { Schema } from "express-validator";

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
      res.status(201).json({ message: "Article Created" });
    }
  }
);

// DESC    Get specific tag articles
// ROUTE   GET /api/v1/articles/:tag
// ACCESS  Public
const getTagArticles = asyncHandler(
  async (req: Request, res: Response) => {
    const { tag } = req.query;
    const tagList = [
      "Games",
      "Music",
      "Movie",
      "Tech",
      "Cooking",
      "Other",
    ];

    if (!tagList.includes(tag as string)) {
      res.status(400);
      throw new Error("Invalid Tag");
    }

    const articles = await Article.find({ tag: tag });

    if (!articles) {
      res.status(404);
      throw new Error("No articles found");
    } else {
      res.status(200).json({ data: articles });
    }
  }
);

// DESC    Like or unlike an article
// ROUTE   POST /api/v1/articles/likes
// ACCESS  Private
const likeOrUnlikeArticle = asyncHandler(
  async (req: Request, res: Response) => {
    const { articleId } = req.body;

    const article = await Article.findById(articleId);

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    if (article.likes.includes(req.session.userId)) {
      const index = article.likes.indexOf(
        req.session.userId
      );
      article.likes.splice(index, 1);
    } else {
      article.likes.push(req.session.userId);
    }

    const savedArticle = article.save();

    if (!savedArticle) {
      res.status(500);
      throw new Error("Something went wrong");
    } else {
      res.status(200).json({ message: "Like changed" });
    }
  }
);

// DESC    Add comments to articles
// ROUTE   POST /api/v1/articles/comment
// ACCESS  Private
const commentOnArticle = asyncHandler(
  async (req: Request, res: Response) => {
    const { comment, articleId } = req.body;

    const article = await Article.findById(articleId);

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    const userCommented = await Article.find({
      "comments.username": req.session.username,
    });

    if (userCommented) {
      res.status(400);
      throw new Error("Already Commented on this Article");
    }

    const newCommentData = {
      username: req.session.username!,
      content: comment,
      date: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      }),
    };

    article.comments.push(newCommentData);

    const commentAdded = await article.save();

    if (!commentAdded) {
      res.status(500);
      throw new Error("Something went wrong");
    } else {
      res.status(201).json({ message: "Comment Added" });
    }
    res.status(200).json({ message: "Done" });
  }
);

// DESC    Edit comment
// ROUTE   PUT /api/v1/articles/comment/edit
// ACCESS  Private
const editComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { articleId, newComment } = req.body;

    if (!newComment) {
      res.status(404);
      throw new Error("Comment can not be blank");
    }

    const article = await Article.findById(articleId);

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    const userCommented = await Article.find({
      "comments.username": req.session.username,
    });

    if (!userCommented) {
      res.status(404);
      throw new Error("Comment not found");
    }

    const commentUpdated = await Article.updateOne(
      {
        "comments.username": req.session.username,
      },
      {
        $set: {
          "comments.$.content": newComment,
        },
      }
    );

    if (!commentUpdated) {
      res.status(500);
      throw new Error("Something went wrong");
    } else {
      res.status(200).json({ message: "Comment Updated" });
    }
  }
);

export {
  getAllArticles,
  createArticle,
  getTagArticles,
  likeOrUnlikeArticle,
  commentOnArticle,
  editComment,
};

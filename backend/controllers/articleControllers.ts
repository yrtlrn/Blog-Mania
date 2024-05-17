// Package Imports
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Model Import
import Article from "../models/articleModel";




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
    const {
      title,
      author,
      tag,
      otherPeople,
      content,
      media,
    } = req.body;
    console.log(req.imageUrls)

    // if (!title || !author || !tag || !content) {
    //   res.status(400);
    //   throw new Error(
    //     "Please enter all the required fields"
    //   );
    // }

    res.status(200).json({ message: "Here" });
  }
);

export { getAllArticles, createArticle };

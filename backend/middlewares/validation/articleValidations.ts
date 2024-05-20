import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const createArticleValidator = [
  body("title")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .isString()
    .escape(),
  body("otherPeople")
    .optional({ values: "falsy" })
    .isString()
    .trim()
    .escape(),
  body("tag")
    .trim()
    .isString()
    .notEmpty()
    .isIn([
      "Games",
      "Music",
      "Movie",
      "Tech",
      "Cooking",
      "Other",
    ])
    .escape(),
  body("content")
    .trim()
    .isString()
    .isLength({ min: 10 })
    .escape(),
  body("media")
    .optional({ values: "falsy" })
    .custom((value, { req }) => {
      if (req.files.mimetype.split("/")[0] === "image") {
        return "image";
      } else {
        return false;
      }
    })
    .withMessage("Please only upload image files"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      res.json({
        message: "Validation Error",
        error: errors.array(),
      });
      return;
    }
    next();
  },
];

const commentOnArticleValidator = [
  body("articleId").trim().notEmpty().isString().escape(),
  body("comment").trim().notEmpty().isString().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      res.json({
        message: "Validation Error",
        error: errors.array(),
      });
      return;
    }
    next();
  },
];

const editCommentValidator = [
  body("articleId").trim().notEmpty().isString().escape(),
  body("newComment").trim().notEmpty().isString().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      res.json({
        message: "Validation Error",
        error: errors.array(),
      });
      return;
    }
    next();
  },
];


export {createArticleValidator,commentOnArticleValidator,editCommentValidator}
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid Email")
    .normalizeEmail()
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters")
    .escape(),
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

const registerValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 3, max: 20 })
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required")
    .isLength({ min: 3, max: 20 })
    .escape(),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 15 })
    .escape(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid Email")
    .normalizeEmail()
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .escape(),
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

const editProfileValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 3, max: 20 })
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required")
    .isLength({ min: 3, max: 20 })
    .escape(),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 15 })
    .escape(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid Email")
    .normalizeEmail()
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .escape(),
  body("newPassword")
    .optional({ values: "falsy" })
    .isLength({ min: 6 })
    .escape(),
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

const editSettingValidator = [
  body("contentDisplay")
    .trim()
    .notEmpty()
    .toLowerCase()
    .isIn(["left", "right", "center"])
    .isString()
    .escape(),
  body("accountVisibility")
    .trim()
    .notEmpty()
    .isLowercase()
    .isIn(["public", "private"])
    .escape(),
  body("hideFollowers")
    .trim()
    .notEmpty()
    .isBoolean()
    .escape(),
  body("hideFollowing")
    .trim()
    .notEmpty()
    .isBoolean()
    .escape(),
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

const articleIdValidator = [
  body("articleId").trim().notEmpty().isString().escape(),
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
const userIdValidator = [
  body("userId").trim().notEmpty().isString().escape(),
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

export {
  loginValidator,
  registerValidator,
  editProfileValidator,
  editSettingValidator,
  articleIdValidator,
  userIdValidator,
};

import { NextFunction, Request, Response } from "express";

const notFoundMW = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send("<h1>Page does not exist</h1>");
};

const errorHanlder = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  res.status(statusCode!).json({
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack,
  });
};

export {notFoundMW, errorHanlder}

import { rateLimit } from "express-rate-limit";

// @ts-ignore
import MongoStore from "rate-limit-mongo";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  limit: process.env.NODE_ENV === "development" ? 999 : 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message:
    "Too many requests in a short duration, IP banned for an hour",
  store: new MongoStore({
    uri: process.env.LIMITER_URI as string,
    expireTimeMS: 1000 * 60 * 15, // 15 Mins
    errorHandler: console.error.bind(
      null,
      "rate-limit-mongo"
    ),
  }),
});

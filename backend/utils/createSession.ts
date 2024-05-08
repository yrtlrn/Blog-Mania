import session from "express-session";
import { Types } from "mongoose";
import { Request } from "express";

declare module "express-session" {
  export interface SessionData {
    userId: Types.ObjectId;
    authorized: boolean;
  }
}

export const createSession = (
  req: Request,
  userId: Types.ObjectId
) => {
  req.session.userId = userId;
  req.session.authorized = true;
};

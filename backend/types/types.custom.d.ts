import session from "express-session";

export {};

declare global {
  namespace Express {
    export interface Request {
      imageUrls: string[];
    }
  }
}

declare module "express-session" {
  export interface SessionData {
    userId: Types.ObjectId;
    authorized: boolean;
  }
}


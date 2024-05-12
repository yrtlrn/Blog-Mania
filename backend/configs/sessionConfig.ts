import { default as connectMongoDBSession } from "connect-mongodb-session";

import session from "express-session";

const MongoDBSession = connectMongoDBSession(session);

const store = new MongoDBSession({
  uri: process.env.SESSION_URI as string,
  collection: "Session",
});


export const sessionConfig = {
  name: "sessionCookie",
  secret: process.env.SESSION_KEY as string,
  saveUninitialized: false,
  resave: true,
  store,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: true,
  },
};

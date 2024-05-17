// Package Imports
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session";

// Configs Imports
import { OWASPHeadersConfig } from "./configs/headerCongif";
import { corsConfigs } from "./configs/corsConfig";
import { sessionConfig } from "./configs/sessionConfig";
import { limiter } from "./configs/limiterConfig";
import { connectToDb } from "./configs/dbConfig";

// Custome Middleware Imports
import {
  errorHanlder,
  notFoundMW,
} from "./middlewares/errors/NotFoundMW";

// Routes Import
import userRoutes from "./routes/userRoutes";
import articleRoutes from "./routes/articleRoutes";

// App
const app = express();

// Configs
app.use(OWASPHeadersConfig);
app.use(cors(corsConfigs));
app.use(session(sessionConfig));
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/articles", articleRoutes);

// Errors Handlers
app.use(notFoundMW);
app.use(errorHanlder);

// Start server function
const startServer = async () => {
  try {
    await connectToDb();
    app.listen(process.env.SERVER_PORT, () =>
      console.log(
        `Serving is listening to port ${process.env.SERVER_PORT}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

// Server Start
startServer();

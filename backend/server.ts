// Package Imports
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import rateLimit from "express-rate-limit";
// Configs Imports
import { OWASPHeadersConfig } from "./configs/headerCongif";
import { corsConfigs } from "./configs/corsConfig";
import { sessionConfig } from "./configs/sessionConfig";
import { limiter } from "./configs/limiterConfig";
import { connectToDb } from "./configs/dbConfig";

// App
const app = express();

// Configs
app.use(OWASPHeadersConfig);
app.use(cors(corsConfigs));
app.use(session(sessionConfig));
app.use(limiter);

app.get("/api/v1", (req: Request, res: Response) => {
  res.status(200).send("The server is running");
});

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

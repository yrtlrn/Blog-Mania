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
import Article from "./models/articleModel";

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

const addArticles = async () => {
  try {
    const randomInt = Math.round(
      Math.random() * (6 - 3) + 3
    );
    const userArray = [
      "jacksparrow",
      "johnwick",
      "megaman",
      "spiderman",
      "peterparker",
      "johnsmith",
      "chrisjohnson",
      "autooctavious",
      "jollysingh",
      "happysingh",
      "johnnybrick",
    ];
    const tagArray = [
      "Games",
      "Cooking",
      "Music",
      "Tech",
      "Movie",
      "Other",
    ];
    let counter = 0;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < userArray.length; y++) {
        for (let z = 0; z < randomInt; z++) {
          await Article.create({
            author: userArray[y],
            title: `This is the ${counter} Article`,
            content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate veniam consectetur ex molestiae numquam dolor distinctio deserunt, sit velit at dolores omnis sed reprehenderit eligendi ut porro tempora natus perspiciatis! Suscipit magni minus nemo illum accusantium nam totam quaerat veniam, est dolor voluptatem sequi cum ipsam beatae, laudantium doloremque natus.`,
            tag: tagArray[Math.round(Math.random() * 5)],
          });
          counter += 1;
        }
      }
    }
    console.log("Articles Created");
  } catch (error) {
    console.log(error);
  }
};

const likesAndComments = async () => {
  const articles = await Article.find();
  const userArray = [
    "jacksparrow",
    "johnwick",
    "megaman",
    "spiderman",
    "peterparker",
    "johnsmith",
    "chrisjohnson",
    "autooctavious",
    "jollysingh",
    "happysingh",
    "johnnybrick",
  ];

  const commentArray = [
    "This is a great article",
    "Fantasic Article",
    "Bad",
    "I didn't like the article",
    "Would recommend to read",
    "Too Long",
    "I jumped on a banana peel",
    "I did not understand",
    "How?",
    "Why? Just Why",
    "No, Never Ever",
  ];
  function Myrand(max: number, min: number) {
    let arr: any = [];
    for (let i = 0; i < max; i++) {
      let x = Math.floor(Math.random() * max) + min;
      if (arr.includes(x) == true) {
        i = i - 1;
      } else {
        if (x > max == false) {
          arr.push(x);
        }
      }
    }
    console.log(arr);
    return arr;
  }

  for (let x = 0; x < articles.length; x++) {
    const selectedArticle = await Article.findById(
      articles[x]._id
    );

    const randomArrayOne = Myrand(10, 0).splice(
      0,
      Math.floor(Math.random() * 10)
    );

    const randomArrayTwo = Myrand(10, 0).splice(
      0,
      Math.floor(Math.random() * 10)
    );

    for (let y = 0; y < randomArrayOne.length; y++) {
      selectedArticle?.likes.push(
        userArray[randomArrayOne[y]]
      );
    }

    for (let y = 0; y < randomArrayTwo.length; y++) {
      selectedArticle?.comments.push({
        content: commentArray[randomArrayTwo[y]],
        date: new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        }),
        username: userArray[randomArrayTwo[y]],
      });
    }

    await selectedArticle?.save();
  }

  console.log("Added likes and comment");
};

// Start server function
const startServer = async () => {
  try {
    await connectToDb();
    app.listen(process.env.SERVER_PORT, () =>
      console.log(
        `Serving is listening to port ${process.env.SERVER_PORT}`
      )
    );
    // addArticles();
    // likesAndComments()
  } catch (error) {
    console.log(error);
  }
};

// Server Start
startServer();

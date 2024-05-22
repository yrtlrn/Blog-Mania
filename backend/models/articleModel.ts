import mongoose, { Schema } from "mongoose";

type articleSchemaType = {
  title: string;
  author: string;
  otherPeople: Array<string>;
  tag: string;
  content: string;
  media: Array<String>;
  likes: Array<string>;
  comments: Array<{
    username: string,
    content: string,
    date: string
  }>;
};

const articleSchema =
  new mongoose.Schema<articleSchemaType>(
    {
      title: {
        type: String,
        minlength: 3,
        required: true,
        trim: true,
      },
      author: {
        type: String,
        minlength: 3,
        required: true,
      },
      otherPeople: {
        type: [String],
      },
      tag: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        minlength: 10,
        required: true,
      },
      media: {
        type: [String],
        default: [],
      },
      likes: {
        type: [String],
      },
      comments: {
        type: [
          {
            username: String,
            content: String,
            date: Schema.Types.Date,
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  );

const Article = mongoose.model<articleSchemaType>(
  "article",
  articleSchema
);

export default Article;

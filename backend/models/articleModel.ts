import mongoose, { Schema } from "mongoose";

type articleSchemaType = {
  title: string;
  author: Schema.Types.ObjectId;
  otherPeople: Array<Schema.Types.ObjectId>;
  tag: string;
  content: string;
  media: Array<String>;
};

const articleSchema =
  new mongoose.Schema<articleSchemaType>({
    title: {
      type: String,
      minlength: 3,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      minlength: 3,
      required: true,
    },
    otherPeople: {
      type: [Schema.Types.ObjectId],
      default: [],
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
  });

const Article = mongoose.model<articleSchemaType>(
  "article",
  articleSchema
);

export default Article;

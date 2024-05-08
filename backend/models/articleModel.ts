import mongoose, { Schema } from "mongoose";

type articleSchemaType = {
  title: string;
  author: Schema.Types.ObjectId;
  otherPeople: Array<Schema.Types.ObjectId>;
  content: string;
  //   media: string;
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
    content: {
      type: String,
      minlength: 10,
      required: true,
    },
    // media: {
    //   type: String,
    // },
  });

const Article = mongoose.model("article", articleSchema);

export default Article;

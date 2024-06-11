import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";

type userSchemaType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  perferences: {
    contentDisplay: "left" | "right" | "center";
    accountVisibility: "public" | "private";
    hideFollowers: boolean;
    hideFollowing: boolean;
  };
  following: Array<string>;
  followers: Array<string>;
  savedArticles: Array<Types.ObjectId>;
  checkpassword: (password: string) => boolean;
};

const userSchema = new mongoose.Schema<userSchemaType>({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 15,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  profilePic: {
    type: String,
  },
  perferences: {
    type: {},
    default: {
      contentDisplay: "left",
      accountVisibility: "public",
      hideFollowers: false,
      hideFollowing: false,
    },
  },
  following: {
    type: [String],
    default: [],
  },
  followers: {
    type: [String],
    default: [],
  },
  savedArticles: {
    type: [Types.ObjectId],
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(
      this.password,
      10
    );
    if (hashedPassword) {
      this.password = hashedPassword;
    } else {
      throw new Error("Something went wrong");
    }
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const updatedValue: any = this.getUpdate();
  if (updatedValue!.password) {
    const hashedPassword = await bcrypt.hash(
      updatedValue.password,
      10
    );
    this.set({ password: hashedPassword });
  }
  next();
});

userSchema.method(
  "checkpassword",
  async function (password: string) {
    const passCheck = await bcrypt.compare(
      password,
      this.password
    );
    return passCheck;
  }
);
userSchema.pre("findOneAndUpdate", async function (next) {
  const updatedValue: any = this.getUpdate();
  if (updatedValue!.password) {
    const hashedPassword = await bcrypt.hash(
      updatedValue.password,
      10
    );
    this.set({ password: hashedPassword });
  }
  next();
});

userSchema.method(
  "checkpassword",
  async function (password: string) {
    const passCheck = await bcrypt.compare(
      password,
      this.password
    );
    return passCheck;
  }
);

const User = mongoose.model<userSchemaType>(
  "users",
  userSchema
);

export default User;

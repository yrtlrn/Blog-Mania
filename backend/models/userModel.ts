import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

type userSchemaType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  perferences: Array<Object>;
  following: Array<string>;
  followers: Array<string>;
  checkpassword: (password:string) => boolean;
};

const userSchema = new Schema<userSchemaType>({
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
    maxlength: 15,
    trim: true,
  },
  perferences: {
    type: [Object],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  followers: {
    type: [String],
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

userSchema.method("checkpassword", async function(password:string) {
  const passCheck = await bcrypt.compare(password,this.password)
  return passCheck
})


const User = mongoose.model<userSchemaType>(
  "users",
  userSchema
);

export default User;

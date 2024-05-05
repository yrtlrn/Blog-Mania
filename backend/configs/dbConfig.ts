import mongoose from "mongoose";

export const connectToDb = async () => {
  const connect = await mongoose.connect(
    process.env.MONGO_URI as string
  );

  if (connect) {
    console.log("Connect to DB");
    return;
  } else {
    console.log("Problem connecting to DB");
    return;
  }
};

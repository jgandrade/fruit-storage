import mongoose, { Document } from "mongoose";
import { LogDoc, LogSchema } from "./Log";

const { Schema } = mongoose;

export interface UserDoc extends Document {
  username: string;
  password: string;
  fullname: string;
  user_logs: Array<LogDoc>;
}

const UserSchema = new Schema<UserDoc>(
  {
    id: {
      type: String,
      required: [true, "ID is required as Unique Identifier"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    fullname: {
      type: String,
      required: [true, "Full Name is required"],
    },
    user_logs: [LogSchema],
  },
  { _id: false },
);

export const User = mongoose.model<UserDoc>("User", UserSchema);

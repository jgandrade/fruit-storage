import mongoose, { Document, Types } from "mongoose";
import { LogDoc, LogSchema } from "../../../infra/mongoose/models/Log";

const { Schema } = mongoose;

export interface IUser extends Document {
  userId: string;
  username: string;
  password: string;
  fullname: string;
  user_logs?: Array<LogDoc>;
}

const UserSchema = new Schema<IUser>({
  _id: { type: Types.ObjectId },
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
});

export const User = mongoose.model<IUser>("User", UserSchema);

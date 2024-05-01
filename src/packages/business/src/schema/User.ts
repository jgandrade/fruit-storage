import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

export interface UserDoc extends Document {
  username: string;
  password: string;
  fullname: string;
}

const UserSchema = new Schema<UserDoc>({
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
});

export const User = mongoose.model<UserDoc>("User", UserSchema);

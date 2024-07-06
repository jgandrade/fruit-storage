import { Types } from "mongoose";
import { IUser } from "../Domain/Entities/user";

export interface IUserDTO extends IUser {
  _id: Types.ObjectId;
}

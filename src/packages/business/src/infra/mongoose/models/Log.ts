import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

enum ActionTaken {
  "created",
  "updated",
  "stored",
  "deleted",
}

interface FromTo {
  from: string | number;
  to: string | number;
}

interface Actions {
  actionTaken: ActionTaken;
  storageChange: {
    description: FromTo;
    quantity_limit: FromTo;
    totalQuantity: FromTo;
    has_deleted: boolean;
  };
}

export interface LogDoc extends Document {
  username: string;
  fullname: string;
  storage_id: string;
  action: Actions;
}

export const LogSchema = new Schema<LogDoc>(
  {
    id: {
      type: String,
      required: [true, "ID is required as Unique Identifier"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    fullname: {
      type: String,
      required: [true, "Full Name is required"],
    },
    storage_id: {
      type: String,
      required: [true, "Storage ID is required"],
    },
    action: {
      type: Object,
      required: [true, "Action is required"],
    },
  },
  { _id: false },
);

export const Log = mongoose.model<LogDoc>("Log", LogSchema);

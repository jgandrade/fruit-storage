import mongoose, { Document } from "mongoose";
import { LogDoc, LogSchema } from "./Log";

const { Schema } = mongoose;

enum Status {
  "empty",
  "loaded",
  "full",
}

interface IFruitStorage extends Document {
  fruitStorageName: string;
  imageUrl: string;
  description: string;
  quantity_limit: number;
  total_quantity: number;
  status: Status;
  audit_logs: LogDoc;
}

export const FruitStorageSchema = new Schema<IFruitStorage>(
  {
    id: {
      type: String,
      required: [true, "ID is required as Unique Identifier"],
    },
    fruitStorageName: {
      type: String,
      required: [true, "Fruit Storage Name is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    quantity_limit: {
      type: Number,
      required: [true, "Quantity Limit is required"],
    },
    total_quantity: {
      type: Number,
      required: [true, "Total Quantity is required"],
    },
    status: String,
    audit_logs: [LogSchema],
  },
  { _id: false },
);

export const FruitStorage = mongoose.model<IFruitStorage>(
  "FruitStorage",
  FruitStorageSchema,
);

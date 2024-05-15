import * as Models from "./models";
import mongoose from "mongoose";
import { config as initialiseDotEnvConfig } from "dotenv";

initialiseDotEnvConfig();

function InitializeDatabaseConnection() {
  mongoose.connect(process.env.MONGO_DB_URL as string);
  const database = mongoose.connection;
  database.on(
    "error",
    console.error.bind(console, "Failed connecting to database."),
  );
  database.once("open", () =>
    console.log("Successfully connected to database"),
  );
}

export { Models, InitializeDatabaseConnection };

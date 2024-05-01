import { config as initialiseDotEnvConfig } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeSchema } from "nexus";
import * as types from "../schema";
import mongoose from "mongoose";
import path from "path";

initialiseDotEnvConfig();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_DB_URL as string);
const database = mongoose.connection;

const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, "../generated/schemas.graphql"),
    typegen: path.join(__dirname, "../generated/schema-types.d.ts"),
  },
});

const server = new ApolloServer({ schema });

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });

  console.log(`🚀  Server ready at: ${url}`);
  database.on(
    "error",
    console.error.bind(console, "Failed connecting to database."),
  );
  database.once("open", () =>
    console.log("Successfully connected to database"),
  );
})();

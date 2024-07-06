import { config as initialiseDotEnvConfig } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { NexusModels } from "../nexus/index";
import { InitializeDatabaseConnection } from "../mongoose";

initialiseDotEnvConfig();
const PORT = process.env.PORT;
const server = new ApolloServer({ schema: NexusModels.schema });

(async () => {
  InitializeDatabaseConnection();

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();

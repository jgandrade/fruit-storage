import { config as initialiseDotEnvConfig } from "dotenv";
import bodyParser from "body-parser";
import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthRouter } from "../routes";

initialiseDotEnvConfig();
const PORT = process.env.PORT;
const app = express();

const origin = {
  origin: "*",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(origin));

app.use("/auth", AuthRouter);

app.all("*", (_, response: Response) => {
  const { status } = response;
  return status(404).send("The Endpoint you are trying to access is not found");
});

app.listen(PORT, () => {
  console.log("Server Listening on Port: ", PORT);
});

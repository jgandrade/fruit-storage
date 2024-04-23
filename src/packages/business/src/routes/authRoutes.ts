import express from "express";
import { Login } from "../controllers/authControllers";

const AuthRouter = express.Router();

AuthRouter.post("/login", Login);

export default AuthRouter;

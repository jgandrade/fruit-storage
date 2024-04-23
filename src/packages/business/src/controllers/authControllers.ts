import { Request, Response } from "express";
import TokenService from "../auth";

const Login = async (request: Request, response: Response) => {
  const { username, password, authorization } = request.headers;
  if (!authorization) {
    return response.send({ data: { message: "No token provided" } });
  }

  const tokenService = new TokenService();

  if (username === "testuser" && password === "testpassword") {
    return response.status(200).send({
      data: {
        tokenAccess: tokenService.authenticateToken(),
        bearerToken: authorization.split(" ")[1],
      },
    });
  }

  return response
    .status(404)
    .send("The username or password you provided is incorrect");
};

export { Login };

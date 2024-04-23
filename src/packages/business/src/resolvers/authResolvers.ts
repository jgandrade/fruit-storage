import { GraphQLError } from "graphql";
import TokenService from "../auth";

export const loginResolve = (args: { username: string; password: string }) => {
  const { username, password } = args;

  if (username === "jgandrade" && password === "jgandrade") {
    const user = {
      id: "23",
      fullName: "John Glenn Andrade",
      userName: "jgandrade",
      emailAddress: "johnglenn.andrade@gmail.com",
    };

    const tokenService = new TokenService();

    return tokenService.authenticateToken(user);
  }

  throw new GraphQLError("Username or Password is Incorrect", {
    extensions: {
      code: "ACCESS-DENIED",
    },
  });
};

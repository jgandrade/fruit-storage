import { objectType, extendType, stringArg, nonNull } from "nexus";
import { loginResolve } from "../resolvers/authResolvers";

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve(_root, args, _ctx) {
        return loginResolve(args);
      },
    });
  },
});

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("accessToken");
    t.string("refreshToken");
  },
});

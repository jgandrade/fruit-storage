import { objectType, extendType, stringArg, nonNull } from "nexus";
import { loginResolve, registerResolve } from "../graphQL/userResolvers";

const AuthLoginPayload = objectType({
  name: "AuthLoginPayload",
  definition(t) {
    t.string("accessToken");
    t.string("refreshToken");
  },
});

const AuthRegisterPayload = objectType({
  name: "AuthRegisterPayload",
  definition(t) {
    t.string("message");
  },
});

export const AuthLogin = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: AuthLoginPayload,
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

export const AuthRegister = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: AuthRegisterPayload,
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
        fullname: nonNull(stringArg()),
        confirmPassword: nonNull(stringArg()),
      },
      resolve(_root, args, _ctx) {
        return registerResolve(args);
      },
    });
  },
});

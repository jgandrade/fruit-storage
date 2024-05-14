import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { TokenService } from "../auth/tokenService";
import { z } from "zod";
import { UserRepository } from "../../Repository";

const registerSchema = z
  .object({
    username: z.string().min(8, "Username must be at least 8 characters"),
    password: z.string().min(10, "Password must be at least 10 characters"),
    fullname: z.string().min(10, "Full Name must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

type Register = z.infer<typeof registerSchema>;

export const loginResolve = async (args: {
  username: string;
  password: string;
}) => {
  const { username, password } = args;

  const userData = await UserRepository.findUserByProps({
    username,
  });

  if (userData) {
    const isPasswordCorrect = bcrypt.compareSync(password, userData.password);

    if (isPasswordCorrect) {
      const tokenService = new TokenService();

      return tokenService.authenticateToken(userData.toObject());
    }

    throw new GraphQLError("Password is Incorrect", {
      extensions: {
        code: "ACCESS-DENIED",
      },
    });
  }

  throw new GraphQLError("Username is Incorrect", {
    extensions: {
      code: "ACCESS-DENIED",
    },
  });
};

export const registerResolve = async (args: Register) => {
  const { username, password, fullname } = args;

  const validateRegistration = registerSchema.safeParse(args);

  if (!validateRegistration.success) {
    throw new GraphQLError(validateRegistration.error.message, {
      extensions: {
        code: "OPERATION-DENIED",
      },
    });
  }

  const userData = await UserRepository.findUserByProps({
    username,
    fullname,
  });

  if (!userData) {
    UserRepository.save({
      fullname,
      password,
      username,
    });

    return { message: "Registered Successfully" };
  }

  throw new GraphQLError("Models.User already exists", {
    extensions: {
      code: "OPERATION-DENIED",
    },
  });
};

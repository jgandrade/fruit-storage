import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { TokenService } from "../modules/User/_Services/auth/tokenService";
import { Models } from "../infra/mongoose";
import { z } from "zod";

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

  const userResults = await Models.User.find({
    $or: [{ username }],
  }).lean();

  if (userResults.length > 0) {
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      userResults[0].password,
    );

    if (isPasswordCorrect) {
      const tokenService = new TokenService();

      return tokenService.authenticateToken(userResults[0].toObject());
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

  const userResults = await Models.User.find({
    $or: [{ username }, { fullname }],
  }).lean();

  if (!userResults.length) {
    const registerUser = new Models.User({
      fullname,
      username,
      password: bcrypt.hashSync(password, 10),
    });

    registerUser.save();

    return { message: "Registered Successfully" };
  }

  throw new GraphQLError("Models.User already exists", {
    extensions: {
      code: "OPERATION-DENIED",
    },
  });
};

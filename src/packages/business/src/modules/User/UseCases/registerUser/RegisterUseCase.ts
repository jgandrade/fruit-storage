import { z } from "zod";
import { GraphQLError } from "graphql";
import { UserRepository } from "../../Repository/userRepository";
import { UserCreationService } from "../../_Services/UserCreationService";

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

export type RegisterRequest = z.infer<typeof registerSchema>;

class RegisterUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(request: RegisterRequest) {
    const validationResult = registerSchema.safeParse(request);

    if (!validationResult.success) {
      throw new GraphQLError(validationResult.error.message, {
        extensions: {
          code: "OPERATION-DENIED",
        },
      });
    }

    const { username, password, fullname } = request;

    const existingUser = await this.userRepository.findUserByProps({
      username,
      fullname,
    });

    if (existingUser) {
      throw new GraphQLError("User already exists", {
        extensions: {
          code: "OPERATION-DENIED",
        },
      });
    }

    const userCreated = await UserCreationService.createUserWithHashedPassword({
      fullname,
      password,
      username,
    });

    await this.userRepository.save(userCreated);

    return { message: "Registered Successfully" };
  }
}

export { RegisterUseCase };

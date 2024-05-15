import bcrypt from "bcrypt";
import { UserRepository } from "../../Repository/userRepository";
import { TokenService } from "../../_Services/auth/tokenService";
import { IUserDTO } from "../../DTO/userDTO";
import { GraphQLError } from "graphql";

export interface ILoginRequest {
  username: string;
  password: string;
}

class LoginUseCase {
  private userRepository: UserRepository;

  private tokenService: TokenService<IUserDTO>;

  constructor(
    userRepository: UserRepository,
    tokenService: TokenService<IUserDTO>
  ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  async execute(request: ILoginRequest) {
    const { username, password } = request;

    const userData: IUserDTO | null = await this.userRepository.findUserByProps(
      {
        username,
      }
    );

    if (!userData) {
      throw new GraphQLError("Username is Incorrect", {
        extensions: {
          code: "ACCESS-DENIED",
        },
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, userData.password);

    if (!isPasswordCorrect) {
      throw new GraphQLError("Password is Incorrect", {
        extensions: {
          code: "ACCESS-DENIED",
        },
      });
    }

    const token = this.tokenService.authenticateToken(userData);

    return token;
  }
}

export { LoginUseCase };

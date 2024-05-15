import { UserRepository } from "../../Repository";
import {
  ILoginRequest,
  LoginUseCase,
} from "../../UseCases/loginUser/LoginUseCase";
import {
  RegisterRequest,
  RegisterUseCase,
} from "../../UseCases/registerUser/RegisterUseCase";
import { TokenService } from "../auth/tokenService";

export const loginResolve = async (args: ILoginRequest) => {
  const tokenService = new TokenService();
  const loginUseCase = new LoginUseCase(UserRepository, tokenService);
  const token = await loginUseCase.execute(args);
  return token;
};

export const registerResolve = async (args: RegisterRequest) => {
  const registerUseCase = new RegisterUseCase(UserRepository);
  const result = await registerUseCase.execute(args);
  return result;
};

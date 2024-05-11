import { User } from "../../Domain/Entities/user";
import { Token } from "./token";

export class TokenService<T extends User> extends Token<T> {
  authenticateToken(userData: T): {
    accessToken: string;
    refreshToken: string;
  } {
    return this.createToken(userData);
  }
}

export default TokenService;

import { IUserDTO } from "../../DTO/userDTO";
import { Token } from "./token";

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export class TokenService<T extends IUserDTO> extends Token<T> {
  authenticateToken(userData: T): ITokenResponse {
    return this.createToken(userData);
  }
}


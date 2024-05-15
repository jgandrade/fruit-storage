import { config as initialiseDotEnvConfig } from "dotenv";
import jwt from "jsonwebtoken";
import { ITokenResponse } from "./tokenService";
import { IUserDTO } from "../../DTO/userDTO";

initialiseDotEnvConfig();

export abstract class Token<T extends IUserDTO> {
  protected jwtAccessSecret: string;

  protected jwtRefreshSecret: string;

  constructor() {
    this.jwtAccessSecret = process.env.JWT_SECRET_ACCESS as string;
    this.jwtRefreshSecret = process.env.JWT_SECRET_REFRESH as string;
    if (!this.jwtAccessSecret || !this.jwtRefreshSecret) {
      throw new Error("JWT secrets are not defined");
    }
  }

  protected getAccessToken(userData: T): string {
    return jwt.sign(userData, this.jwtAccessSecret as string, {
      expiresIn: "30m",
    });
  }

  protected getRefreshToken(userData: T): string {
    return jwt.sign(userData, this.jwtRefreshSecret as string, {
      expiresIn: "7d",
    });
  }

  protected createToken(userData: T): ITokenResponse {
    const accessToken = this.getAccessToken(userData);
    const refreshToken = this.getRefreshToken(userData);
    return { accessToken, refreshToken };
  }
}

import { config as initialiseDotEnvConfig } from "dotenv";
import jwt from "jsonwebtoken";

initialiseDotEnvConfig();

interface User {
  id: string;
  fullName: string;
  userName: string;
  emailAddress: string;
}

abstract class Token<T extends User> {
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

  protected createToken(userData: T): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.getAccessToken(userData);
    const refreshToken = this.getRefreshToken(userData);
    return { accessToken, refreshToken };
  }
}

class TokenService<T extends User> extends Token<T> {
  authenticateToken(userData: T): {
    accessToken: string;
    refreshToken: string;
  } {
    return this.createToken(userData);
  }
}

export default TokenService;

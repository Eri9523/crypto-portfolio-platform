import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "./environment";

export interface TokenPayload {
  userId: string;
  email: string;
}

export class JwtService {
  generateAccessToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: config.jwt.expiresIn as any,
    };
    if (!config.jwt.secret)
      throw new Error("JWT_SECRET is not defined in environment variables");

    return jwt.sign(payload, config.jwt.secret, options);
  }

  generateRefreshToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: config.jwt.refreshExpiresIn as any,
    };
    if (!config.jwt.refreshSecret)
      throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");

    return jwt.sign(payload, config.jwt.refreshSecret, options);
  }

  verifyAccessToken(token: string): TokenPayload {
    try{
        return jwt.verify(token, config.jwt.secret!) as TokenPayload;
    }catch(error){
        throw new Error('Invalid or expred refresh token')
    }
  }

  verifyRefreshToken(token:string): TokenPayload{
    try{
        return jwt.verify(token, config.jwt.refreshSecret!) as TokenPayload
    }catch(error){
        throw new Error('Invalid or expired refresh token')
    }
  }
}

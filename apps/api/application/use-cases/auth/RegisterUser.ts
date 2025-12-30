import bcrypt from "bcrypt";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserEntity, UserEntity } from "../../../domain/entities/User";
import { JwtService } from "../../../infrastructure/config/jwt";
import { Jwt } from "jsonwebtoken";

export interface RegisterUserDto {
  email: string;
  name: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
  refreshToken: string;
}

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: JwtService
  ) {}

  async execute(dto: RegisterUserDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userEntity = UserEntity.create(
      dto.email,
      dto.name,
      hashedPassword,
      dto.phone
    );

    const savedUser = await this.userRepository.create(userEntity)

    const tokenPayload = {
        userId: savedUser.id,
        email: savedUser.email,
    }

    const accessToken = this.jwtService.generateAccessToken(tokenPayload)
    const refreshToken = this.jwtService.generateRefreshToken(tokenPayload);

    return {
        user: {
            id: savedUser.id,
            email: savedUser.email,
            name: savedUser.name,
            phone: savedUser.phone,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        },
        accessToken,
        refreshToken
    }
  }
}

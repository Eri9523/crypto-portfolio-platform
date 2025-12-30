import { Request, Response } from "express";
import { RegisterUser } from "../../../application/use-cases/auth/RegisterUser";
import { LoginUser } from "../../../application/use-cases/auth/LoginUser";
import { RefreshToken } from "../../../application/use-cases/auth/RefreshToken";
import { MongoUserRepository } from "../../database/mongo/repositories/MongoUserRepository";
import { JwtService } from "../../config/jwt";
import { AuthRequest } from "../middlewares/authMiddleware";

const userRepository = new MongoUserRepository();
const jwtService = new JwtService();

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password, phone } = req.body;
      if (!email || !name || !password) {
        res
          .status(400)
          .json({ message: "Email, name and password are required" });
        return;
      }

      const registerUser = new RegisterUser(userRepository, jwtService);

      const result = await registerUser.execute({
        email,
        name,
        password,
        phone,
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const loginUser = new LoginUser(userRepository, jwtService);
      const result = await loginUser.execute({ email, password });

      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ message: "Refresh token is required" });
        return;
      }

      const refreshTokenUseCase = new RefreshToken(userRepository, jwtService);
      const result = await refreshTokenUseCase.execute(refreshToken);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = await userRepository.findById(req.user.userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async logout(_req: Request, res: Response): Promise<void> {
    // In a stateless JWT system, logout is handled client-side
    // Here we just return success
    res.status(200).json({ message: "Logged out successfully" });
  }
}

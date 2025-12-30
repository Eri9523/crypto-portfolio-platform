import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { JwtService } from "../../../infrastructure/config/jwt";

export class RefreshToken {
    constructor(
        private userRepository: IUserRepository,
        private jwtService: JwtService
    ) {  }

    async execute( refreshToken: string): Promise<{accessToken: string; refreshToken: string}>{
        const payload = this.jwtService.verifyRefreshToken(refreshToken);

        const user = await this.userRepository.findById(payload.userId);
        if(!user) throw new Error('User not found');

        const tokenPayload = {
            userId: user.id,
            email: user.email,
        };

        const newAccessToken = this.jwtService.generateAccessToken(tokenPayload)
        const newRefreshToken = this.jwtService.generateRefreshToken(tokenPayload)

        return{
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }
}
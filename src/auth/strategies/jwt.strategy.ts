// src/auth/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) { 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'smittywerbenjagermanjensen',
        });
    }

    async validate(payload: { sub: number; username: string }) {
        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            throw new Error("User not found");
        }
        
        return { id: user.id, name: user.name };
    }
}

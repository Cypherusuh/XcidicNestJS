import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "src/users/users.entity";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async login(user: User) {
        const payload = { username: user.name, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

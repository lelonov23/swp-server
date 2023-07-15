import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService,
        ) {}

    signin() {
        return { msg: "success" }
    }

    async signToken(
        userId: number, 
        email: string
        ) {
            const payload = {
                sub: userId,
                email
            }

            return this.jwt.signAsync(payload, {
                expiresIn: '15m',

            })
        }
 }
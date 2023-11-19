import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./local.stategy";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env["JWT_SECRET"] ?? "",
      signOptions: { expiresIn: "10min" },
    }),
  ],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

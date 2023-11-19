import { Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";

import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { RequestForUnauthenticatedGuest } from "./auth/auth";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBody({
    required: true,
    description: "Provide username and password for authentication.",
    schema: { example: { username: "moh3a", password: "******" } },
  })
  @ApiResponse({
    description:
      "Returns the JWT access token to provide in API routes that require authorization.",
  })
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req: RequestForUnauthenticatedGuest) {
    return this.authService.login(req.user);
  }
}

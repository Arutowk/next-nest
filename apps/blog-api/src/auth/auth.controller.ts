import { Controller, Get, Request, Res, UseGuards } from "@nestjs/common";
import { Request as ExpressRequest, Response } from "express";
import { User } from "src/generated/prisma/client";

import { AuthService } from "./auth.service";
import { GoogleAuthGuard } from "./guards/google-auth/google-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleCallback(@Request() req: ExpressRequest, @Res() res: Response) {
    console.log("user111:", req.user);

    const userData = await this.authService.login(req.user as User);

    res.redirect(
      `http://localhost:4000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("verify-token")
  verify() {
    return "ok";
  }
}

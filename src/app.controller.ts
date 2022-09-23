import {Controller, Request, Post, UseGuards, Body, HttpCode, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { UserDto } from "./users/user.dto";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: UserDto) {
    return this.authService.login(data.username, data.password)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() data: UserDto) {
    return this.authService.register(data.username, data.password)
  }
}

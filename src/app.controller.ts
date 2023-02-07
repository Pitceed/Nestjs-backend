import {Controller, Request, Post, UseGuards, Body, HttpCode, UsePipes, ValidationPipe, Get, Req} from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { UserDto } from "./users/user.dto";
import { UsersService } from "./users/users.service";
import {ChatDto} from "./chats/dto/chat.dto";
import {ChatService} from "./chats/chat.service";


@Controller()
export class AppController {
  
  constructor(
      private readonly authService: AuthService,
      private readonly userService: UsersService,
      private readonly chatService: ChatService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getCurrentUser( @Request() request: any ) {
    console.log(request.user)
    return this.userService.findOne(request.user.username)
  }

  @Post('login')
  async login( @Body() data: UserDto ) {
    return this.authService.login(data.username, data.password)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register( @Body() data: UserDto ) {
    return this.authService.register(data.username, data.password)
  }

  @Post('singleChat')
  async createSingleChat(@Body() data: ChatDto) {
    console.log(data)
    return this.chatService.createSingleChat(data.title, data.imageUrl)
  }

  @Post('personal-chat')
  async createPersonalChat(@Body() data: {usernameId: string, myId: string}) {
    console.log(data)
    return this.chatService.createPersonalChat(data.usernameId, data.myId)
  }

  @Post('group-chat')
  async createGroupChat(@Body() data: {title: string, myId: string}) {
    console.log(data)
    return this.chatService.createGroupChat(data.title, data.myId)
  }

  @Post('member-to-group-chat')
  async addMemberToGroupChat(@Body() data: {chatId: string, usernameId: string}) {
    return this.chatService.addMemberToGroupChat(data.chatId, data.usernameId)
  }
}

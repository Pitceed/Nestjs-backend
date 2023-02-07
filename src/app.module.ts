import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from "./users/entity/user.entity";
import { MessageEntity } from "./chats/entities/message.entity";
import { ChatEntity } from "./chats/entities/chat.entity";
import {UserChatEntity} from "./chats/entities/user_chat.entity";
import {ChatModule} from "./chats/chat.module";
import {ChatService} from "./chats/chat.service";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dev',
      password: '123456',
      database: 'kilogrammapp',
      entities: [
          UserEntity,
          MessageEntity,
          ChatEntity,
          UserChatEntity
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

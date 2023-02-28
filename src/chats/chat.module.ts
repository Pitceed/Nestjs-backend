import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatEntity } from "./entities/chat.entity";
import { UserChatEntity } from "./entities/user_chat.entity";
import {MessageEntity} from "./entities/message.entity";
import {UserEntity} from "../users/entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ChatEntity, UserChatEntity, MessageEntity, UserEntity])
    ],
    providers: [ChatService],
    exports:[ChatService],
})

export class ChatModule {}
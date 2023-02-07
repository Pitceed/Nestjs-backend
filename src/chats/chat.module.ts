import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatEntity } from "./entities/chat.entity";
import { UserChatEntity } from "./entities/user_chat.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ChatEntity, UserChatEntity])
    ],
    providers: [ChatService],
    exports:[ChatService],
})

export class ChatModule {}
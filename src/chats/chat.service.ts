import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ChatEntity} from "./entities/chat.entity";
import {Repository} from "typeorm";
import {UserChatEntity} from "./entities/user_chat.entity";
import {ChatType} from "./enum/chat-type";
import {ChatRole} from "./enum/chat-role";

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(ChatEntity)
        private readonly chatRepository: Repository<ChatEntity>,
        @InjectRepository(UserChatEntity)
        private readonly userChatRepository: Repository<UserChatEntity>
    ) {
    }

    async createSingleChat(title: string, imageUrl: string) {

        //TODO: add existing chat validation!!

        return this.chatRepository.save(
            this.chatRepository.create({
                title: title,
                imageUrl: imageUrl
            })
        )
    }

    async createPersonalChat(usernameId: string, myId: string) {

        //TODO: add existing chat validation!!

        const chat = await this.chatRepository.save(
            this.chatRepository.create({
                title: null,
                imageUrl: null,
                type: ChatType.PERSONAL
            })
        )
        console.log(chat.id)
        await this.userChatRepository.save(
            this.userChatRepository.create({
                createdAt: new Date,
                updatedAt: new Date,
                permission: ChatRole.ADMIN,
                userId: usernameId,
                chatId: chat.id
            })
        )

        await this.userChatRepository.save(
            this.userChatRepository.create({
                createdAt: new Date,
                updatedAt: new Date,
                permission: ChatRole.ADMIN,
                userId: myId,
                chatId: chat.id
            })
        )
    }

    async createGroupChat(title: string, myId: string) {

        //TODO: add existing chat validation!!

        console.log(title, myId)
        const chat = await this.chatRepository.save(
            this.chatRepository.create({
                title: title,
                imageUrl: null,
                type: ChatType.GROUP
            })
        )

        await this.userChatRepository.save(
            this.userChatRepository.create({
                createdAt: new Date,
                updatedAt: new Date,
                permission: ChatRole.ADMIN,
                userId: myId,
                chatId: chat.id
            })
        )
    }

    async addMemberToGroupChat(chatId: string, usernameId: string) {

        //TODO: add existing chat validation!!

        await this.userChatRepository.save(
            this.userChatRepository.create({
                createdAt: new Date,
                updatedAt: new Date,
                permission: ChatRole.DEFAULT,
                userId: usernameId,
                chatId: chatId
            })
        )
    }
}

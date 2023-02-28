import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatEntity } from "./entities/chat.entity";
import { Repository} from "typeorm";
import { UserChatEntity } from "./entities/user_chat.entity";
import { ChatType } from "./enum/chat-type";
import { ChatRole } from "./enum/chat-role";
import { MessageEntity } from "./entities/message.entity";
import {UserEntity} from "../users/entity/user.entity";

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(ChatEntity)
        private readonly chatRepository: Repository<ChatEntity>,
        @InjectRepository(UserChatEntity)
        private readonly userChatRepository: Repository<UserChatEntity>,
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
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

    async createPersonalChat(userId: string, myId: string) {

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
                userId: userId,
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

    async addMemberToGroupChat(chatId: string, userId: string) {

        //TODO: add existing chat validation!!

        await this.userChatRepository.save(
            this.userChatRepository.create({
                createdAt: new Date,
                updatedAt: new Date,
                permission: ChatRole.DEFAULT,
                userId: userId,
                chatId: chatId
            })
        )
    }

    async findExistingChat(chatId: string) {
        return await this.chatRepository.find({where: {id: chatId}})
    }

    async addMessageToChat(chatId: string, text: string, authorId: string) {
        await this.messageRepository.save(
            this.messageRepository.create({
                text: text,
                createdAt: new Date,
                authorId: authorId,
                chatId: chatId
            })
        )
        return true
    }

    async getChatsByUserId(userId: string) {
        const userChats = await this.userChatRepository.find({
            where: {userId: userId},
            relations: {
                chat: true
            }
        })

        const chatsArray = []
        for (let value of userChats) {

            const chatLastMessage = await this.messageRepository.findOne({
                where: {chatId: value.chat.id}, order: {"createdAt": "DESC"}
            })

            let title = ''

            if (!value.chat.title) {
                title = "personal"
                let allUsersByChat = await this.userChatRepository.find({where: {chatId : value.chatId}})
                for (let chat of allUsersByChat) {
                    if (chat.userId != value.userId) {
                        let correspondingUser = await this.userRepository.findOne({where: {id: chat.userId}})
                        title = correspondingUser.username
                        console.log(`my id is ${value.userId} , and my companion is ${chat.userId}`)
                    }
                }
            } else {
                title = value.chat.title
            }

            let chatInstance = {
                id : value.chat.id,
                title : title,
                imageUrl : value.chat.imageUrl,
                lastMessage : chatLastMessage
            }

            chatsArray.push(chatInstance)
        }

        return chatsArray
    }

    async getMessagesByChat(chatId: string) {
        return this.messageRepository.find({where: {chatId: chatId}, order: {"createdAt": "ASC"}})
    }
}

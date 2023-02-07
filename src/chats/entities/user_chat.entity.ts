import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { JoinColumn } from "typeorm";
import { ChatEntity } from "./chat.entity";
import {ChatRole} from "../enum/chat-role";

@Entity('user_chat')
export class UserChatEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'user_id'})
    userId: string;

    @Column({name: 'chat_id'})
    chatId: string;

    @Column( {type: 'varchar', default: ChatRole.DEFAULT, nullable: false})
    permission: ChatRole

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(type => UserEntity, user => user.chats)
    @JoinColumn([{name: 'user_id', referencedColumnName: 'id'}])
    users: UserEntity[];

    @ManyToOne(type => ChatEntity, chat => chat.users)
    @JoinColumn([{name: 'chat_id', referencedColumnName: 'id'}])
    chats: ChatEntity[];
}

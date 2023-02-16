import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { MessageEntity } from "./message.entity";
import { ChatType } from "../enum/chat-type";
import { UserChatEntity } from "./user_chat.entity";

@Entity('chats')
export class ChatEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({type: 'varchar' , nullable: true, unique: false})
    title: string;

    @Column({name: 'image_url', type: 'varchar', nullable: true})
    imageUrl: string;

    @Column({type: 'varchar', default: ChatType.PERSONAL})
    type: ChatType;

    @OneToMany(() => MessageEntity, message => message.chat)
    messages: MessageEntity[];

    @OneToMany(() => UserChatEntity, userToChat => userToChat.user)
    userToChat: UserChatEntity[];
}


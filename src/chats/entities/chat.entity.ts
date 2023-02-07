import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { MessageEntity } from "./message.entity";
import { UserEntity } from "../../users/entity/user.entity";
import { ChatType } from "../enum/chat-type";

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

    @OneToMany(type => MessageEntity, message => message.chat)
    messages: MessageEntity[];

    @ManyToMany(type => UserEntity, user => user.chats)
    users: UserEntity[];
}


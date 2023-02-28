import {Entity, Column, PrimaryGeneratedColumn, OneToMany, Generated} from 'typeorm';
import { UserChatEntity } from "../../chats/entities/user_chat.entity";
import {Get} from "@nestjs/common";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column()
    @Generated('uuid')
    username: string;

    @OneToMany(() => UserChatEntity, userToChat => userToChat.chat)
    userToChat: UserChatEntity[];
}

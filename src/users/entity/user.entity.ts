import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { UserChatEntity } from "../../chats/entities/user_chat.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @OneToMany(() => UserChatEntity, userToChat => userToChat.chat)
    userToChat: UserChatEntity[];
}

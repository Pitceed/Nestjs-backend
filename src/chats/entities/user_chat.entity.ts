import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";
import { ChatEntity } from "./chat.entity";
import { ChatRole } from "../enum/chat-role";

@Entity('user_chat')
export class UserChatEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    chatId: string;

    @Column( {type: 'varchar', default: ChatRole.DEFAULT, nullable: false})
    permission: ChatRole

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(type => UserEntity, user => user.userToChat)
    user: UserEntity;

    @ManyToOne(type => ChatEntity, chat => chat.userToChat)
    chat: ChatEntity;
}

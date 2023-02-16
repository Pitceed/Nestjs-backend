import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ChatEntity } from "./chat.entity";


@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({type: 'varchar', nullable: false, unique: false})
    text: string;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'author_id', type: 'varchar'})
    authorId: string;

    @Column()
    chatId: string;

    @ManyToOne(type => ChatEntity, chat => chat.messages)
    chat: ChatEntity;
}
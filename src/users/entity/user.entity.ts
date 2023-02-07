import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ChatEntity } from "../../chats/entities/chat.entity";
import { JoinTable } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    //@ManyToMany( type => ChatEntity, chat => chat.users)
    chats: ChatEntity[];
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findOne(email: string): Promise <UserEntity | undefined> {
        console.log(email)
        const response = await this.userRepository.findOne({where: {email: email}})
        console.log(response)
        return response
    }

    async createUser(data: Partial<UserEntity>) {
        return this.userRepository.save(
            this.userRepository.create(data)
        )
    }

    async changeUsername(userId: string , username: string) {
        if(await this.userRepository.findOne({where: {username: username}})) {
            let error = "current username is already existing"
            console.log(error)
            return error
        } else {
            return this.userRepository.update({id: userId}, {username: username})
        }
    }
}

import {BadRequestException, Injectable} from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { genSalt, hash} from "bcryptjs";
import {UserEntity} from "../users/entity/user.entity";


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(username: string, password: string) {
        const user = await this.getAndValidateUser(username, password)
        if (!user) {
            throw new BadRequestException()
        }
       return this.genAuthTokensPair(user)
    }

    async register(username: string, password: string) {
        /**
         * TODO add existing validation
         */
        return this.genAuthTokensPair(
            await this.usersService.createUser({
                username: username,
                password: await hash(
                    password, await genSalt(10),
                ),
            })
        )
    }

    async getAndValidateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if (user && (await  this.passwordsAreEqual(user.password, pass))) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    private async passwordsAreEqual(hashedPassword: string, plainPassword): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }

    private async genAuthTokensPair(user: UserEntity) {
        const payload = {username: user.username, sub: user.id}
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: ''//TODO add refres_htoken implementation
        }
    }
}

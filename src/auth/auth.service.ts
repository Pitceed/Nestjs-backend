import { BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { genSalt, hash} from "bcryptjs";
import { UserEntity } from "../users/entity/user.entity";


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {

        const user = await this.getAndValidateUser(email, password)
        if (!user) {
            throw new BadRequestException()
        }
       return this.genAuthTokensPair(user)
    }

    async register(email: string, password: string) {
        const user = await this.usersService.findOne(email)
        if (user) {
            throw new BadRequestException()
        } else {
            return this.genAuthTokensPair(
                await this.usersService.createUser({
                    email: email,
                    password: await hash(
                        password, await genSalt(10),
                    ),
                })
            )
        }
    }



    async getAndValidateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email)
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
        const payload = {email: user.email, sub: user.id}
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: ''//TODO add refresh_token implementation
        }
    }
}

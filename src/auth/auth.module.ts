import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
      UsersModule,
      PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false
      }),
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn : '7d'}
      })
  ],
  providers: [
      AuthService,
      LocalStrategy,
      JwtStrategy
  ],
  exports: [
      AuthService,
      LocalStrategy,
      JwtStrategy,
  ]
})
export class AuthModule {}

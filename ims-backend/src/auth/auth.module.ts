import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuardJwt } from './auth.guard-jwt';
import { AuthPayload, AuthPayloadSchema } from './auth.model';
import { AuthService } from './auth.service';
import { StrategyJwt } from './strategies/auth.strategy-jwt';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: AuthPayload.name, schema: AuthPayloadSchema }]),
      JwtModule.register({
        secret: process.env.APP_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    ],
    providers: [AuthService, StrategyJwt, AuthGuardJwt],
    exports: [AuthService],
  })
export class AuthModule {}

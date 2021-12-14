import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StrategyJwt extends PassportStrategy(Strategy) {

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,//false,
      secretOrKey: process.env.APP_SECRET,
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
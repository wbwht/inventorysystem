import { Injectable } from '@nestjs/common';
import { CreatePersonInput } from 'src/person/person.inputs';
import { PersonService } from 'src/person/person.service';
import { AuthPayload } from 'src/auth/auth.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { forwardRef } from '@nestjs/common';
import { Inject } from '@nestjs/common';


@Injectable()
export class AuthService {
    constructor(       
        private jwtService: JwtService,
    ) {}

    async generateJwt(user) {
        return this.jwtService.signAsync({user});
    }

    async hashPassword(password: string) {
        return (bcrypt.hash(password, 12));
    }

    async comparePasswords(password: string, storedPasswordHash: string) {
        return bcrypt.compare(password, storedPasswordHash);
    }
}

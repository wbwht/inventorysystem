import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Person, PersonSchema } from './person.model';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    AuthModule,
  ],
  providers: [PersonService, PersonResolver],
})
export class PersonModule {}

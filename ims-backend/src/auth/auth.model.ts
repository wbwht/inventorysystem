import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Person } from 'src/person/person.model';

@ObjectType()
@Schema()
export class AuthPayload {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  token: string;

  @Field(() => Person)
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Person.name })
  user: Person;
}

export type AuthPayloadDocument = AuthPayload & Document;

export const AuthPayloadSchema = SchemaFactory.createForClass(AuthPayload);
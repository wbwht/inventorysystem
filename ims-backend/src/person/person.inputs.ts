import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreatePersonInput {
  @Field(() => String)
  name: string;

  @Field(() => [String])
  products: MongooseSchema.Types.ObjectId[];

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class ListPersonInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [String], { nullable: true })
  products?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class UpdatePersonInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  products?: MongooseSchema.Types.ObjectId[];
}

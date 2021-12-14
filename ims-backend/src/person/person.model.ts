import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Product } from '../product/product.model';

@ObjectType()
@Schema()
export class Person {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => [String], { nullable: 'items' })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Product.name })
  products: MongooseSchema.Types.ObjectId[];
}

export type PersonDocument = Person & Document;

export const PersonSchema = SchemaFactory.createForClass(Person);

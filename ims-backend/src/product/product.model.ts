import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Product {
  @Field(() => String)
  _id!: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description: string;

  @Field(() => String, { nullable: true })
  @Prop()
  category: string;

  @Field(() => String, { nullable: true })
  @Prop()
  date_posted: string;

  @Field(() => String, { nullable: true })
  @Prop()
  author: string;

  @Field(() => String, { nullable: true })
  @Prop()
  postedById: MongooseSchema.Types.ObjectId;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Product } from './product.model';
import { ProductService } from './product.service';
import {
  CreateProductInput,
  ListProductInput,
  UpdateProductInput,
} from './product.inputs';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => Product)
  async product(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.productService.getPost(_id);
  }

  @Query(() => [Product])
  async products(
    @Args('filters', { nullable: true }) filters: ListProductInput,
  ) {
    return this.productService.getPosts(filters);
  }

  @Mutation(() => Product)
  async createProduct(@Args('payload') payload: CreateProductInput) {
    return this.productService.addPost(payload);
  }

  @Mutation(() => Product)
  async updateProduct(@Args('payload') payload: UpdateProductInput) {
    return this.productService.editPost(payload);
  }

  @Mutation(() => Product)
  async deleteProduct(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.productService.deletePost(_id);
  }
}

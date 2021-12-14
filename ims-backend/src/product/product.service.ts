import { Injectable } from '@nestjs/common';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDocument } from './product.model';
import {
  CreateProductInput,
  ListProductInput,
  UpdateProductInput,
} from './product.inputs';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getPosts(filters: ListProductInput) {
    console.log(filters);

    // filtering & search
    if (filters && filters.category) {
      const posts = await this.productModel
        .find({ category: filters.category }, null, {
          skip: filters.skip,
          limit: filters.limit,
        })
        .exec();
      console.log('filter posts: ' + posts);
      return posts;
    }

    // pagination
    if (filters && (filters.skip || filters.limit)) {
      const posts = await this.productModel
        .find({}, null, { skip: filters.skip, limit: filters.limit })
        .exec();
      console.log('posts: ' + posts);
      return posts;
    }

    // search
    if (filters && filters.search) {
      const posts = await this.productModel
        .find(
          {
            $or: [
              { title: { $regex: filters.search, $options: 'i' } },
              { category: { $regex: filters.search, $options: 'i' } },
              { description: { $regex: filters.search, $options: 'i' } },
            ],
          },
          null,
          { skip: filters.skip, limit: filters.limit },
        )
        .exec();
      console.log('posts: ' + posts);
      return posts;
    }
    // normal findall
    const posts = await this.productModel.find().exec();
    console.log('get all products: ' + posts);
    return posts;
  }
  async getPost(_ID: MongooseSchema.Types.ObjectId) {
    const post = await this.productModel.findById(_ID).exec();
    return post;
  }
  async addPost(newProduct: CreateProductInput) {
    const newPost = await new this.productModel(newProduct);
    return newPost.save();
  }
  async editPost(payload: UpdateProductInput) {
    return this.productModel
      .findByIdAndUpdate(payload._id, {
        title: payload.title,
        description: payload.description,
        category: payload.category,
      })
      .exec();
  }
  async deletePost(_id: MongooseSchema.Types.ObjectId) {
    return this.productModel.findByIdAndRemove(_id).exec();
  }
}

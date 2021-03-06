import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
// import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './product.model';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, ProductResolver],
  controllers: [],
})
export class ProductModule {}

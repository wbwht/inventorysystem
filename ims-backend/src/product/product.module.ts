import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ProductService } from './product.service';
// import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './product.model';

import { AuthenticationMiddleware } from '../common/authentication.middleware';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, ProductResolver],
  controllers: [],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      //{ method: RequestMethod.POST, path: '/product/post' },
      { method: RequestMethod.PUT, path: '/product/edit' },
      { method: RequestMethod.DELETE, path: '/product/delete' },
    );
  }
}

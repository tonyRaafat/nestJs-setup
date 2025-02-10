import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductEntityRepository } from './product-entity.repository';
import { ProductElasticsearchRepository } from './product-elasticsearch.repository';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ElasticsearchModule.register({
      node: 'http://elastic:j+8cg9O7Jyx-DPkRprlo@localhost:9200',
    }),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductEntityRepository,
    ProductElasticsearchRepository,
  ],
})
export class ProductsModule {}

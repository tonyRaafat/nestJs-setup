import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/database/entity.repository';
import { Product, ProductDocument } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductEntityRepository extends EntityRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name) readonly productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}

import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ElasticsearchRepository } from 'src/elasticsearch/elasticsearch.repository';

@Injectable()
export class ProductElasticsearchRepository extends ElasticsearchRepository<Product> {}

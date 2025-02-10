/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto, CreateProductsDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntityRepository } from './product-entity.repository';
import { ProductElasticsearchRepository } from './product-elasticsearch.repository';

@Injectable()
export class ProductsService {
  index: string = 'products';
  constructor(
    private productEntityRepository: ProductEntityRepository,
    private productElasticsearchRepository: ProductElasticsearchRepository,
  ) {}

  async create(createProductDto: CreateProductDto | CreateProductsDto) {
    try {
      let newCreateProductDto: CreateProductDto | CreateProductDto[];
      if ('products' in createProductDto) {
        newCreateProductDto = createProductDto.products;
      } else {
        newCreateProductDto = createProductDto;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const docs = await this.productElasticsearchRepository.addDocument(
        this.index,
        newCreateProductDto,
      );
      return await this.productEntityRepository.create(newCreateProductDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllElasticSearch() {
    try {
      return await this.productElasticsearchRepository.getAllDocuments(
        this.index,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.productEntityRepository.find({});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.productEntityRepository.findOne({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async searchByMust(query) {
    return await this.productElasticsearchRepository.searchByMust(
      this.index,
      query,
    );
  }

  async searchByShould(query) {
    return await this.productElasticsearchRepository.searchByShould(
      this.index,
      query,
    );
  }
  async searchByFilter(query) {
    return await this.productElasticsearchRepository.searchByFilter(
      this.index,
      query,
    );
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = this.productEntityRepository.findOneAndUpdate(
        { _id: id },
        updateProductDto,
      );
      await this.productElasticsearchRepository.updateDocument(
        this.index,
        id,
        updateProductDto,
      );
      return updatedProduct;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.productEntityRepository.deleteMany({ _id: id });
      await this.productElasticsearchRepository.deleteDocument(this.index, id);
      return res ? { msg: 'done' } : { msg: 'no change' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async removeAllElasticSearch() {
    try {
      await this.productElasticsearchRepository.clearIndex(this.index);
      return 'done';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

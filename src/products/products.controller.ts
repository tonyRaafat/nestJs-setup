import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, CreateProductsDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto | CreateProductsDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('elastic-search/')
  findAllElasticSearch() {
    return this.productsService.findAllElasticSearch();
  }

  @Get('elastic-search/search/must')
  searchMust(@Body() query) {
    return this.productsService.searchByMust(query);
  }

  @Get('elastic-search/search/should')
  searchShould(@Body() query) {
    return this.productsService.searchByShould(query);
  }
  @Get('elastic-search/search/filter')
  searchFilter(@Body() query) {
    return this.productsService.searchByFilter(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Delete('elastic-search/all')
  removeAllElasticSearch() {
    return this.productsService.removeAllElasticSearch();
  }
}

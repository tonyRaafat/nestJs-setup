/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}

export class CreateProductsDto {
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  @IsNotEmpty()
  products: CreateProductDto[];
}

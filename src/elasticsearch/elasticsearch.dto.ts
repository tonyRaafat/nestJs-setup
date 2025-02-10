/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsArray,
  IsInt,
  Min,
  Max,
  IsOptional,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

class TermQueryDTO {
  @IsString()
  field: string;

  @IsString()
  value: string;
}

class MatchQueryDTO {
  @IsString()
  field: string;

  @IsString()
  value: string;
}

class RangeQueryDTO {
  @IsString()
  field: string;

  @IsInt()
  @Min(0)
  gte: number;

  @IsInt()
  @Max(100)
  lte: number;
}

class QueryTypeDTO {
  @ValidateNested()
  @IsOptional()
  @Type(() => TermQueryDTO)
  term?: TermQueryDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => MatchQueryDTO)
  match?: MatchQueryDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => RangeQueryDTO)
  range?: RangeQueryDTO;
}

class BoolQueryDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QueryTypeDTO)
  @IsOptional()
  must?: QueryTypeDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QueryTypeDTO)
  @IsOptional()
  should?: QueryTypeDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QueryTypeDTO)
  @IsOptional()
  filter?: QueryTypeDTO[];
}

class QueryDTO {
  @ValidateNested()
  @Type(() => BoolQueryDTO)
  @IsOptional()
  bool?: BoolQueryDTO;
}

class SortDTO {
  @IsString()
  field: string;

  @IsString()
  @IsIn(['asc', 'desc'])
  order: string;
}

export class SearchRequestDTO {
  @ValidateNested()
  @Type(() => QueryDTO)
  query: QueryDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortDTO)
  @IsOptional()
  sort?: SortDTO[];

  @IsInt()
  @Min(1)
  size: number;
}

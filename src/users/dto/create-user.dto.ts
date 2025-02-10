/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export enum Role {
  admin = 'Admin',
  user = 'User',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsPositive()
  age: number;
  @IsArray()
  @IsString({ each: true })
  hobbies: string[];
  @IsEnum(Role, { message: 'role must be either User or Admin' })
  role: Role;
}

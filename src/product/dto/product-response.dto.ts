import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  version: number;
}

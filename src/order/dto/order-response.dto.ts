import { IsNumber, IsString } from 'class-validator';

export class OrderResponseDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  totalPrice: number;

  @IsString()
  status: string;
}

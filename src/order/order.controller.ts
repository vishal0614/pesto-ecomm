import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { Order } from './schemas/order.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/place')
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    try {
      const order: Order = await this.orderService.create(createOrderDto);
      return this.toOrderResponseDto(order);
    } catch (error) {
      console.error('Error creating order:', error);
      throw new HttpException(
        'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<OrderResponseDto[]> {
    try {
      const orders: Order[] = await this.orderService.findAll();
      return orders.map((order) => this.toOrderResponseDto(order));
    } catch (error) {
      console.error('Error retrieving orders:', error);
      throw new HttpException(
        'Failed to retrieve orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderResponseDto> {
    try {
      const order: Order = await this.orderService.findOne(id);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return this.toOrderResponseDto(order);
    } catch (error) {
      console.error(`Error retrieving order with id ${id}:`, error);
      throw new HttpException(
        'Failed to retrieve order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderResponseDto> {
    try {
      const order: Order = await this.orderService.update(id, updateOrderDto);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return this.toOrderResponseDto(order);
    } catch (error) {
      console.error(`Error updating order with id ${id}:`, error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            'Failed to update order',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<OrderResponseDto> {
    try {
      const order: Order = await this.orderService.delete(id);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return this.toOrderResponseDto(order);
    } catch (error) {
      console.error(`Error deleting order with id ${id}:`, error);
      throw new HttpException(
        'Failed to delete order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private toOrderResponseDto(order: Order): OrderResponseDto {
    return {
      id: order._id.toString(),
      userId: order.userId,
      productId: order.productId,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
    };
  }
}

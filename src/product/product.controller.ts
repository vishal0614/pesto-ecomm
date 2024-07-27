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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { Product } from './schemas/product.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    try {
      const product = await this.productService.create(createProductDto);
      return this.toProductResponseDto(product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    try {
      const products = await this.productService.findAll();
      return products.map(this.toProductResponseDto);
    } catch (error) {
      console.error('Error retrieving products:', error);
      throw new HttpException(
        'Failed to retrieve products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    try {
      const product = await this.productService.findOne(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return this.toProductResponseDto(product);
    } catch (error) {
      console.error(`Error retrieving product with id ${id}:`, error);
      throw new HttpException(
        'Failed to retrieve product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    try {
      const product = await this.productService.update(id, updateProductDto);
      return this.toProductResponseDto(product);
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error instanceof HttpException
        ? error
        : new HttpException(
            'Failed to update product',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProductResponseDto> {
    try {
      const product = await this.productService.delete(id);
      return this.toProductResponseDto(product);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private toProductResponseDto(product: Product): ProductResponseDto {
    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      version: product.version,
    };
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import Product from './entities/product';
import { CreateProductDto } from './dtos/createProductDto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts(): Promise<Product[]> {
      const products = await this.productService.getAllProducts();
      return products;
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
      const newProduct = await this.productService.createProduct(createProductDto);
      return newProduct;
    }
}

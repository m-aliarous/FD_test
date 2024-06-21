import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
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

    @Put(':id')
    async editProduct(@Param('id') id: string, @Body() editProductDto: CreateProductDto) {
      const updatedProduct = await this.productService.editProduct(Number(id), editProductDto);
      return updatedProduct;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Product> {
      const deletedProduct = await this.productService.deleteProduct(Number(id));
      return deletedProduct;
    }
    @Get('/:id')
    async getProduct(@Param('id') id: string): Promise<Product> {
      const product = await this.productService.getProductById(Number(id));
      return product;
    }
}

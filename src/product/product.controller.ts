import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import Product from './entities/product';
import { CreateProductDto } from './dtos/createProductDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import Category from './enums/category';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        const products = await this.productService.getAllProducts();
        return products;
    }
    @Get('filter')
    async getProducts(
        @Query('category') category?: Category,
        @Query('sortByPrice') sortByPrice?: 'asc' | 'desc',)
        : Promise<Product[]> {
        const products = await this.productService.getProducts(category,sortByPrice);
        return products;
    }
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        const newProduct = await this.productService.createProduct(createProductDto);
        return newProduct;
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put(':id')
    async editProduct(@Param('id') id: string, @Body() editProductDto: CreateProductDto) {
        const updatedProduct = await this.productService.editProduct(Number(id), editProductDto);
        return updatedProduct;
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Product> {
        const deletedProduct = await this.productService.deleteProduct(Number(id));
        return deletedProduct;
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('/:id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        const product = await this.productService.getProductById(Number(id));
        return product;
    }
}

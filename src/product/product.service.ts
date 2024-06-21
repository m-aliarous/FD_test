import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Product from './entities/product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProductDto';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
      ) {}

//      Create Product
      async createProduct(createProductDto?: CreateProductDto) {
        if (!createProductDto) {
            throw new HttpException('CreateProductDto is undefined', HttpStatus.BAD_REQUEST);
          }
        const { name,description, price, category,image } = createProductDto;
        const newProduct = await this.productRepository.create({name,description, price, category,image});
        await this.productRepository.save(newProduct);
        return newProduct;
      }
//      Return All products
      async getAllProducts() {
        const products = this.productRepository.find();
        return products;
      }
}

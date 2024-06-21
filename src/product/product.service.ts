import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import Product from './entities/product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProductDto';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    //      Create Product
    async createProduct(createProductDto?: CreateProductDto) {
        if (!createProductDto) {
            throw new HttpException('CreateProductDto is undefined', HttpStatus.BAD_REQUEST);
        }
        const { name, description, price, category, image } = createProductDto;
        const newProduct = await this.productRepository.create({ name, description, price, category, image });
        await this.productRepository.save(newProduct);
        return newProduct;
    }
    //      Return All products
    async getAllProducts() {
        const products = this.productRepository.find();
        return products;
    }
    //      Return product by ID
    async getProductById(id: number) {
        const product = await this.productRepository.findOne({
          where: {
            id: id,
          },
        });
        if (product) {
          return product;
        }
        throw new NotFoundException('Could not find the product');
      }
    //      Edit a Product
    async editProduct(id: number, editProductDto: CreateProductDto) {
        const product = await this.getProductById(id);
        if(!product) throw new NotFoundException('Could not find the product');
        const { name, description, price, category, image } = editProductDto;
        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.image = image;
        const editedProduct = await this.productRepository.save(product);
        return editedProduct;
    }
    //      delete a Product
    async deleteProduct(id: number) {
        const product = await this.getProductById(id);
        if(!product) throw new NotFoundException('Could not find the product');
        await this.productRepository.delete(product.id);
        return product;
    }
}

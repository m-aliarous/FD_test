import { Injectable } from '@nestjs/common';
import Product from './entities/product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private userRepository: Repository<Product>,
      ) {}
}

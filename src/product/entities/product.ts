import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from 'typeorm';

import Category from '../enums/category';
  
  @Entity()
  class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:"uuid",})
    @Generated("uuid")
    uuid: string;

    @CreateDateColumn({name:"created_at",})
    createdAt: Date;
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ name: 'category', type: 'enum', enum: Category })
    category: Category;

    @Column({ name: 'image' })
    image: string;
  }
  
  export default Product;
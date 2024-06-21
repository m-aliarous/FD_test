
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import Category from '../enums/category';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Invalid category' })
  category: Category;

  @IsNotEmpty()
  @IsString()
  image: string;
}
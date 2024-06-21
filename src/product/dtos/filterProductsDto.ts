
import { IsOptional, IsEnum, IsIn } from 'class-validator';
import Category from '../enums/category';

export class GetProductsDto {
  @IsOptional()
  @IsEnum(Category, { message: 'Invalid category' })
  category?: Category;

  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'sortByPrice must be either "asc" or "desc"' })
  sortByPrice?: 'asc' | 'desc';
}
/* eslint-disable new-cap */
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import PaginationDto from '../../common/dtos/paginationDto';

const productModelFieldsToOrder = ['name', 'description', 'createdAt'];
const productModelFieldsToSearch = ['name', 'description'];

class ProductPaginationDto extends PaginationDto {
	@IsIn(productModelFieldsToOrder, {
		each: true,
	})
	@IsString()
	@IsOptional()
	sortBy!: string;

	@IsIn(productModelFieldsToSearch, {
		each: true,
	})
	@IsString()
	@IsOptional()
	findBy!: string;

	@MinLength(2)
	@IsString()
	@IsOptional()
	value!: string;
}

export default ProductPaginationDto;

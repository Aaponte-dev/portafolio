/* eslint-disable new-cap */
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import PaginationDto from '../../common/dtos/paginationDto';

const roleModelFieldsToOrder = ['name', 'createdAt'];
const roleModelFieldsToSearch = ['name'];

class RolePaginationDto extends PaginationDto {
	@IsIn(roleModelFieldsToOrder, {
		each: true,
	})
	@IsString()
	@IsOptional()
	sortBy!: string;

	@IsIn(roleModelFieldsToSearch, {
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

export default RolePaginationDto;

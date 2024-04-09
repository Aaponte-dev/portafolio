/* eslint-disable new-cap */
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import PaginationDto from '../../common/dtos/paginationDto';

const userModelFieldsToOrder = ['firstName', 'email', 'createdAt'];
const userModelFieldsToSearch = ['firstName', 'email'];

class UserPaginationDto extends PaginationDto {
	@IsIn(userModelFieldsToOrder, {
		each: true,
	})
	@IsString()
	@IsOptional()
	sortBy!: string;

	@IsIn(userModelFieldsToSearch, {
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

export default UserPaginationDto;

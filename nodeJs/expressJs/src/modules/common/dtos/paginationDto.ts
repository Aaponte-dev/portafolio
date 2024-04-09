/* eslint-disable new-cap */
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

class PaginationDto {
	@IsPositive()
	@IsNumber()
	@IsOptional()
	limit!: number;

	@IsPositive()
	@IsNumber()
	@IsOptional()
	page!: number;
}

export default PaginationDto;

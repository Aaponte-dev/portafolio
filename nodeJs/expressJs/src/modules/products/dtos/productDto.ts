/* eslint-disable new-cap */
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Length,
} from 'class-validator';
import Actions from '../../../enums/actions';

class ProductDto {
	@Length(2, 30, {
		groups: [Actions.CREATE, Actions.UPDATE],
	})
	@IsNotEmpty({
		groups: [Actions.CREATE],
	})
	@IsString({
		groups: [Actions.CREATE, Actions.UPDATE],
	})
	@IsOptional({
		groups: [Actions.UPDATE],
	})
	name!: string;

	@Length(10, 100, {
		groups: [Actions.CREATE, Actions.UPDATE],
	})
	@IsNotEmpty({
		groups: [Actions.CREATE],
	})
	@IsString({
		groups: [Actions.CREATE, Actions.UPDATE],
	})
	@IsOptional({
		groups: [Actions.UPDATE],
	})
	description!: string;

	@IsPositive({
		groups: [Actions.CREATE, Actions.UPDATE],
	})
	@IsNumber(
		{},
		{
			groups: [Actions.CREATE, Actions.UPDATE],
		},
	)
	@IsOptional({
		groups: [Actions.UPDATE],
	})
	quantity!: string;

	@IsPositive({
		groups: [Actions.CREATE, Actions.UPDATE],
	})
	@IsNumber(
		{},
		{
			groups: [Actions.CREATE, Actions.UPDATE],
		},
	)
	@IsOptional({
		groups: [Actions.UPDATE],
	})
	price!: string;
}

export default ProductDto;

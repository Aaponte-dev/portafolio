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

class RoleDto {
	@Length(5, 15, {
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
	position!: string;
}

export { RoleDto };

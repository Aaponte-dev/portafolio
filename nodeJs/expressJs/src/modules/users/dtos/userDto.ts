/* eslint-disable new-cap */
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Length,
} from 'class-validator';
import Actions from '../../../enums/actions';

class UserDto {
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
	firstName!: string;

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
	lastName!: string;

	@IsNotEmpty({
		groups: [Actions.CREATE],
	})
	@IsEmail(
		{},
		{
			groups: [Actions.CREATE, Actions.UPDATE],
		},
	)
	@IsOptional({
		groups: [Actions.UPDATE],
	})
	email!: string;

	@Length(5, 45, {
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
	password!: string;

	@IsNotEmpty({
		groups: [Actions.CREATE],
	})
	@IsUUID()
	@IsOptional({
		groups: [Actions.UPDATE],
	})
	roleId!: string;
}

export default UserDto;

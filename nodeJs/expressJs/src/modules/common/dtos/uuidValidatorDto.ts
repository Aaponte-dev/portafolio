/* eslint-disable new-cap */
import { IsNotEmpty, IsUUID } from 'class-validator';

class UuidValidatorDto {
	@IsNotEmpty()
	@IsUUID()
	id!: string;
}

export default UuidValidatorDto;

/* eslint-disable new-cap */
import { IsMongoId, IsNotEmpty } from 'class-validator';

class ObjectIdValidatorDto {
	@IsNotEmpty()
	@IsMongoId()
	id!: string;
}

export default ObjectIdValidatorDto;

/* eslint-disable new-cap */
import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity as TypeOrmBaseEntity,
} from 'typeorm';

abstract class BaseEntity extends TypeOrmBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@CreateDateColumn()
	createdAt!: Date;
}

export default BaseEntity;

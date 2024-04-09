/* eslint-disable new-cap */
import { Column, Entity, Index, OneToMany } from 'typeorm';
import BaseEntity from './baseEntity';
import User from './user';

@Entity()
class Role extends BaseEntity {
	@Index({ unique: true })
	@Column({ type: 'varchar', length: 15 })
	name!: string;

	@Column({ type: 'int' })
	position!: number;

	@OneToMany(() => User, (user) => user.role)
	users!: User[];
}

export default Role;

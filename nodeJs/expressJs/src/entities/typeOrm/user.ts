/* eslint-disable new-cap */
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import BaseEntity from './baseEntity';
import Role from './role';

@Entity()
export class User extends BaseEntity {
	@Column({ type: 'varchar', length: 15 })
	firstName!: string;

	@Column({ type: 'varchar', length: 15 })
	lastName!: string;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 40 })
	email!: string;

	@Column({ type: 'varchar' })
	password!: string;

	@ManyToOne(() => Role, (rol) => rol.users)
	role!: Role;
}

export default User;

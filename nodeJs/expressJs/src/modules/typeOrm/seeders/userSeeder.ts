import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import Role from '../../../entities/typeOrm/role';
import { Seeder } from 'typeorm-extension';
import User from '../../../entities/typeOrm/user';

export class UserSeeder implements Seeder {
	track = false;

	public async run(dataSource: DataSource): Promise<void> {
		const emailAdmin = 'admin@mail.com';
		const userRepository = dataSource.getRepository(User);
		const roleRepository = dataSource.getRepository(Role);
		const role = await roleRepository.findOneBy({ position: 1 });
		if (!role) {
			console.error(`Role not found ${role}`);
			throw new Error('Role not found');
		}
		const userAdminExist = await userRepository.findOneBy({
			email: emailAdmin,
		});
		if (!userAdminExist) {
			const password = '123456789';
			const user = new User();
			user.firstName = 'user';
			user.lastName = 'admin';
			user.email = emailAdmin;
			user.password = await bcrypt.hash(password, 10);
			user.role = role;
			await userRepository.save(user);
		}
	}
}

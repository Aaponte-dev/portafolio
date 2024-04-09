import { DataSource } from 'typeorm';
import Role from '../../../entities/typeOrm/role';
import { Seeder } from 'typeorm-extension';

export class RoleSeeder implements Seeder {
	track = false;

	public async run(dataSource: DataSource): Promise<void> {
		console.group('ROLE_SEEDER_1712092391670:RUN');
		const roleName = 'ADMIN';
		const repository = dataSource.getRepository(Role);
		const roleExist = await repository.findOneBy({ name: roleName });
		if (!roleExist) {
			const role = new Role();
			role.name = roleName;
			role.position = 1;
			await repository.save(role);
		}
		console.groupEnd();
	}
}

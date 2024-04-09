import { runSeeder, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RoleSeeder } from './roleSeeder';
import { UserSeeder } from './userSeeder';

export class MainSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		await runSeeder(dataSource, RoleSeeder);
		await runSeeder(dataSource, UserSeeder);
	}
}

import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import { SeederOptions } from 'typeorm-extension';

console.log(process.env);

export default new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5435,
	username: 'admin',
	password: 'example',
	database: 'test',
	synchronize: false,
	logging: true,
	entities: [path.join(__dirname, 'dist/src/entities/typeOrm/*{.ts,.js}')],
	migrations: [
		path.join(__dirname, 'dist/src/modules/typeOrm/migrations/*{.ts,.js}'),
	],
	seeds: [path.join(__dirname, 'dist/src/modules/typeOrm/seeders/*{.ts,.js}')],
} as unknown as DataSourceOptions & SeederOptions);

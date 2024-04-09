import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import EnvironmentVariables from '../../configs/environmentVariables';
import path from 'path';
import { SeederOptions } from 'typeorm-extension';

class TypeOrmModule {
	private connection: DataSource;

	// eslint-disable-next-line no-use-before-define
	private static instance: TypeOrmModule;

	private readonly className = 'TYPE_ORM_MODULE';

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.connection = this.createDataSource();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`TYPE_ORM_MODULE:GET_INSTANCE`);
		if (!TypeOrmModule.instance) TypeOrmModule.instance = new TypeOrmModule();
		console.groupEnd();
		return TypeOrmModule.instance;
	}

	private createDataSource(): DataSource {
		console.group(`${this.className}:CREATE_DATA_SOURCE`);
		const {
			host = 'localhost',
			port,
			user = 'test',
			password = '',
			dbName,
			synchronize = false,
			logging = false,
		} = this.extractValueOfEnvironmentVariables();

		const options: DataSourceOptions & SeederOptions = {
			type: 'postgres',
			host: host,
			port,
			username: user,
			password: password,
			database: dbName || '',
			synchronize: synchronize,
			logging: logging,
			entities: [path.join(__dirname, '../../entities/typeOrm/*{.ts,.js}')],
			subscribers: [],
			migrations: [],
			seeds: [path.join(__dirname, './seeders/*.ts')],
		};

		const response = new DataSource(options);
		console.groupEnd();
		return response;
	}

	private extractValueOfEnvironmentVariables() {
		console.group(`${this.className}:EXTRACT_VALUE_OF_ENVIRONMENT_VARIABLES`);
		const environment = EnvironmentVariables.getInstance();
		const values = environment.getValues();
		const { host, port, user, password, dbName, synchronize, logging } =
			values.project.postgreSql;
		console.groupEnd();
		return { host, port, user, password, dbName, synchronize, logging };
	}

	async createConnection(): Promise<void> {
		console.group(`${this.className}:EXTRACT_VALUE_OF_ENVIRONMENT_VARIABLES`);
		try {
			this.connection = await this.connection.initialize();
		} catch (error) {
			console.error(error);
			throw new Error('Error');
		}
		console.groupEnd();
	}

	getConnection(): DataSource {
		console.group(`${this.className}:GET_CONNECTION`);
		const response = this.connection;
		console.groupEnd();
		return response;
	}
}

export default TypeOrmModule;

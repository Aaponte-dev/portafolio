import { connect } from 'mongoose';
import EnvironmentVariables from '../../configs/environmentVariables';

class MongooseModule {
	// eslint-disable-next-line no-use-before-define
	private static instance: MongooseModule;

	private readonly className = 'MONGOOSE_MODULE';

	// eslint-disable-next-line no-empty-function
	private constructor() {}

	static getInstance() {
		console.group(`MONGOOSE_MODULE:GET_INSTANCE`);
		if (!MongooseModule.instance)
			MongooseModule.instance = new MongooseModule();
		console.groupEnd();
		return MongooseModule.instance;
	}

	async connect() {
		console.group(`${this.className}:CONNECT`);
		try {
			const { url, dbName } = this.createConnectionUrl();
			await this.createConnection(url, dbName);
			console.groupEnd();
		} catch (error) {
			console.error(error);
			if (error instanceof Error) throw new Error(error.message);
		}
	}

	private createConnectionUrl() {
		console.group(`${this.className}:CREATE_CONNECTION_URL`);
		const environment = EnvironmentVariables.getInstance();
		const values = environment.getValues();
		const { host, port, user, password, dbName } = values.project.mongoDb;
		let url = 'mongodb://';
		if (user) url += `${user}:`;
		if (password) url += `${password}@`;
		url += `${host}:${port}`;
		console.groupEnd();
		return {
			url,
			dbName,
		};
	}

	private async createConnection(url: string, dbName: string) {
		console.group(`${this.className}:CREATE_CONNECTION`);
		const response = await connect(url, {
			dbName: dbName,
		});
		response.set('debug', true);
		console.groupEnd();
	}
}

export default MongooseModule;

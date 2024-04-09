class EnvironmentVariables {
	// eslint-disable-next-line no-use-before-define
	private static instance: EnvironmentVariables;

	private readonly port: number;

	private readonly mongoHost: string | undefined;

	private readonly mongoPort: number;

	private readonly mongoUser: string | undefined;

	private readonly mongoPassword: string | undefined;

	private readonly mongoDbName: string;

	private readonly postgreHost: string | undefined;

	private readonly postgrePort: number;

	private readonly postgreUser: string | undefined;

	private readonly postgrePassword: string | undefined;

	private readonly postgreDbName: string | undefined;

	private readonly postgreSync: boolean | undefined;

	private readonly postgreLogging: boolean | undefined;

	private readonly jwtSecret: string | undefined;

	private readonly jwtExpireIn: string | undefined;

	// eslint-disable-next-line complexity
	private constructor() {
		this.validateValues();
		const {
			PORT,
			MONGO_PORT,
			MONGO_HOST,
			MONGO_USER,
			MONGO_PASSWORD,
			MONGO_DB_NAME,
			POSTGRE_HOST,
			POSTGRE_PORT,
			POSTGRE_USER,
			POSTGRE_PASSWORD,
			POSTGRE_DB_NAME,
			POSTGRE_SYNC,
			POSTGRE_LOGGING,
			JWT_SECRET,
			JWT_EXPIRE_IN,
		} = process.env;

		this.port = PORT ? Number(PORT) : 3050;
		this.mongoHost = MONGO_HOST;
		this.mongoPort = 27017;
		if (MONGO_PORT && !Number.isNaN(Number(MONGO_PORT)))
			this.mongoPort = Number(MONGO_PORT);
		this.mongoUser = MONGO_USER;
		this.mongoPassword = MONGO_PASSWORD;
		this.mongoDbName = MONGO_DB_NAME ?? 'test';
		this.postgreHost = POSTGRE_HOST;
		this.postgrePort = POSTGRE_PORT ? Number(POSTGRE_PORT) : 3050;
		this.postgreUser = POSTGRE_USER;
		this.postgrePassword = POSTGRE_PASSWORD;
		this.postgreDbName = POSTGRE_DB_NAME;
		this.postgreSync = POSTGRE_SYNC === 'true';
		this.postgreLogging = POSTGRE_LOGGING === 'true';
		this.jwtSecret = JWT_SECRET;
		this.jwtExpireIn = JWT_EXPIRE_IN;
	}

	static getInstance() {
		console.group(`ENVIRONMENT_VARIABLES:GET_INSTANCE`);
		if (!EnvironmentVariables.instance)
			EnvironmentVariables.instance = new EnvironmentVariables();
		console.groupEnd();
		return EnvironmentVariables.instance;
	}

	// eslint-disable-next-line complexity
	private validateValues(): void {
		const {
			PORT,
			MONGO_PORT,
			MONGO_HOST,
			MONGO_DB_NAME,
			POSTGRE_HOST,
			POSTGRE_PORT,
			POSTGRE_USER,
			POSTGRE_PASSWORD,
			POSTGRE_DB_NAME,
			JWT_SECRET,
			JWT_EXPIRE_IN,
		} = process.env;

		if (Number.isNaN(Number(PORT)))
			throw new Error("field 'PORT' cannot be a string");
		if (Number.isNaN(Number(MONGO_PORT)))
			throw new Error("field 'MONGO_PORT' cannot be a string");
		if (!MONGO_HOST) throw new Error("field 'MONGO_HOST' cannot be a null");
		if (!MONGO_DB_NAME)
			throw new Error("field 'MONGO_DB_NAME' cannot be a null");
		if (Number.isNaN(Number(POSTGRE_PORT)))
			throw new Error("field 'POSTGRE_PORT' cannot be a string");
		if (!POSTGRE_HOST) throw new Error("field 'POSTGRE_HOST' cannot be a null");
		if (!POSTGRE_USER) throw new Error("field 'POSTGRE_USER' cannot be a null");
		if (!POSTGRE_PASSWORD)
			throw new Error("field 'POSTGRE_PASSWORD' cannot be a null");
		if (!POSTGRE_DB_NAME)
			throw new Error("field 'POSTGRE_DB_NAME' cannot be a null");
		if (!JWT_SECRET) throw new Error("field 'JWT_SECRET' cannot be a null");
		if (!JWT_EXPIRE_IN)
			throw new Error("field 'JWT_EXPIRE_IN' cannot be a null");
	}

	getValues() {
		return {
			project: {
				port: this.port,
				mongoDb: {
					host: this.mongoHost,
					port: this.mongoPort,
					user: this.mongoUser,
					password: this.mongoPassword,
					dbName: this.mongoDbName,
				},
				postgreSql: {
					host: this.postgreHost,
					port: this.postgrePort,
					user: this.postgreUser,
					password: this.postgrePassword,
					dbName: this.postgreDbName,
					synchronize: this.postgreSync,
					logging: this.postgreLogging,
				},
				jwt: {
					secret: this.jwtSecret,
					expireIn: this.jwtExpireIn,
				},
			},
		};
	}
}

export default EnvironmentVariables;

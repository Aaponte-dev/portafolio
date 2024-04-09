import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import EnvironmentVariables from './configs/environmentVariables';
import HandlerError from './middlewares/handlerError';
import helmet from 'helmet';
import http from 'http';
import MongooseModule from './modules/mongoose/mongooseModule';
import passport from 'passport';
import PassportModule from './modules/passport/passportModule';
import Route from './routes';
import TypeOrmModule from './modules/typeOrm/typeOrmModule';

// Import SocketModule from './socket/socketModule';

class Server {
	private readonly app: Application;

	private readonly server: http.Server;

	private readonly port: number;

	constructor() {
		this.app = express();
		// Deepcode ignore UseCsurfForExpress: <Simple application designed to expose certain topics>
		this.server = new http.Server(this.app);
		this.port = this.getPort();
		this.startServer();
	}

	private getPort(): number {
		console.group('SERVER:GET_PORT');
		const environment = EnvironmentVariables.getInstance();
		const projectEnvironment = environment.getValues();

		const { port } = projectEnvironment.project;
		console.groupEnd();
		return port;
	}

	// eslint-disable-next-line require-await
	private async startServer() {
		console.group('SERVER:START_SERVER');
		this.loadMiddleware();
		// This.loadSocket();
		await this.connectDb();
		this.loadRoute();
		this.loadCors();
		this.loadPassport();
		this.listenPort();
		console.groupEnd();
	}

	private loadMiddleware() {
		console.group('SERVER:LOAD_MIDDLEWARE');
		this.app.use(express.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.disable('x-powered-by');
		this.app.use(helmet());
		console.groupEnd();
	}

	// Private loadSocket() {
	// 	Console.group('SERVER:LOAD_SOCKET');
	// 	Const socket = new SocketModule();
	// 	Socket.connect(this.server);
	// 	Console.groupEnd();
	// }

	private loadRoute() {
		console.group('SERVER:LOAD_ROUTE');
		this.app.use(Route.createRoutesOfProject());
		const handlerError = HandlerError.getInstance();
		this.app.use(handlerError.logErrors);
		this.app.use(handlerError.boomErrorHandler);
		this.app.use(handlerError.errorHandler);
		console.groupEnd();
	}

	private loadCors() {
		console.group('SERVER:GET_PORT');
		this.app.use(cors());
		console.groupEnd();
	}

	private async connectDb() {
		console.group('SERVER:CONNECT_DB');
		const mongo = MongooseModule.getInstance();
		await mongo.connect();
		console.log('Mongo database connected!');
		const typeOrmModule = TypeOrmModule.getInstance();
		await typeOrmModule.createConnection();
		console.log('Postgre database connected!');
		console.groupEnd();
	}

	private loadPassport() {
		console.group('SERVER:LOAD_PASSPORT');
		this.app.use(passport.initialize());
		const passportModule = PassportModule.getInstance();
		passportModule.loadStrategies();
		console.groupEnd();
	}

	listenPort() {
		console.group('SERVER:LISTEN_PORT');
		this.server
			.listen(this.port, () =>
				console.debug(`Server running in port ${this.port}`),
			)
			.on('error', (error) => {
				console.error(error);
			});
		console.groupEnd();
	}
}

new Server();

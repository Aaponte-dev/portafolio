import * as swaggerUiExpress from 'swagger-ui-express';
import AuthRoute from './authRoute';
import ProductRoute from './productRoute';
import RoleRoute from './roleRoute';
import { Router } from 'express';
import Routing from './createRouter';
import SwaggerJsDocService from '../modules/swaggerJsDoc/swaggerJsDocService';
import UserRoute from './userRoute';
import UtilRoute from './utilRoute';

class Route {
	// eslint-disable-next-line no-use-before-define
	private static instance: Route;

	// eslint-disable-next-line no-empty-function
	private constructor() {}

	static getInstance() {
		console.group(`ROUTE:GET_INSTANCE`);
		if (!Route.instance) Route.instance = new Route();
		console.groupEnd();
		return Route.instance;
	}

	/**
	 * @openapi
	 * components:
	 *   securitySchemes:
	 *     bearerAuth:
	 *       type: http
	 *       scheme: bearer
	 *       bearerFormat: JWT
	 */
	static createRoutesOfProject(): Router {
		console.group('ROUTE:CREATE_ROUTES_OF_PROJECT');
		const routing = Routing.createRouting();
		const authRoutes = AuthRoute.getInstance();
		const productRoutes = ProductRoute.getInstance();
		const userRoutes = UserRoute.getInstance();
		const roleRoutes = RoleRoute.getInstance();
		const utilRoutes = UtilRoute.getInstance();
		const swaggerJsDocService = SwaggerJsDocService.getInstance();
		routing.use('/api/v1/auth', authRoutes.createRotes());
		routing.use(
			'/api/v1/doc',
			swaggerUiExpress.serve,
			swaggerUiExpress.setup(swaggerJsDocService.setting()),
		);
		routing.use('/api/v1/product', productRoutes.createRotes());
		routing.use('/api/v1/role', roleRoutes.createRotes());
		routing.use('/api/v1/user', userRoutes.createRotes());
		routing.use('/api/v1/util', utilRoutes.createRotes());
		console.groupEnd();
		return routing;
	}
}
export default Route;

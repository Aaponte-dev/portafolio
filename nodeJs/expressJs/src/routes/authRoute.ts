import { NextFunction, Request, Response, Router } from 'express';
import { loginSchema } from '../schemas/authSchema';
import passport from 'passport';
import { ResponseModule } from '../modules/response/responseModule';
import Routing from './createRouter';
import validationMiddleware from '../middlewares/validationMiddleware';

class AuthRoute {
	// eslint-disable-next-line no-use-before-define
	private static instance: AuthRoute;

	private readonly className = 'AUTH_ROUTE';

	private readonly route;

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.route = Routing.createRouting();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`AUTH_ROUTE:GET_INSTANCE`);
		if (!AuthRoute.instance) AuthRoute.instance = new AuthRoute();
		console.groupEnd();
		return AuthRoute.instance;
	}

	createRotes(): Router {
		console.group(`${this.className}:CREATE_ROUTES`);

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       UserAuth:
		 *         type: object,
		 *         properties:
		 *           id:
		 *             type: string,
		 *             format: uuid,
		 *             example: 670acaa7-f070-48b5-a01f-9e5c9688aedc
		 *           firstName:
		 *             type: string,
		 *             format: string,
		 *             example: Raul
		 *           lastName:
		 *             type: string,
		 *             format: string,
		 *             example: Pascal
		 *           email:
		 *             type: string,
		 *             format: email,
		 *             example: test@mail.com
		 *           password:
		 *             type: string,
		 *             format: password,
		 *             example: vqNmpubFVHxRQnpaHLFNwDmxappHVjAUWDQgFWgGgCrirxLaEwkRLhVKYfPE
		 *           role:
		 *             type: string,
		 *             format: uuid,
		 *             example: 2c4ba42e-ca85-4132-9342-719a7b7d26b9
		 *           createdAt:
		 *             type: string,
		 *             format: date,
		 *             example: 2024-03-16T01:44:25.449Z
		 *           token:
		 *             type: string,
		 *             format: string,
		 *             example: li8GMu2TTljxmsenuHNk1o0PboDpmWWA.UL84gOdA1HXjxIWmZK2081vPMU0jnkO7yT7slPVORXgcf5F4iw6US9qE1Pbd00oU.87MW6GdB1uhiPT5rZxQd7BQ9sp8rEep9
		 */

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       ResponseSuccessAuth:
		 *         type: object
		 *         properties:
		 *           meta:
		 *             type: object
		 *             properties:
		 *               success:
		 *                 type: boolean,
		 *                 example: true
		 *               message:
		 *                 type: string,
		 *                 format: string,
		 *                 example: Request carried out correctly
		 *               timestamp:
		 *                 type: Date,
		 *                 format: Date,
		 *                 example: 2024-03-19T01:44:25.449Z
		 *           data:
		 *             type: object
		 *             "$ref": "#/components/schemas/UserAuth"
		 *       ResponseWithErrorAuth:
		 *         type: object
		 *         properties:
		 *           meta:
		 *             type: object
		 *             properties:
		 *               success:
		 *                 type: boolean,
		 *                 example: false
		 *               message:
		 *                 type: string,
		 *                 format: string,
		 *                 example: error message example
		 *               timestamp:
		 *                 type: Date,
		 *                 format: Date,
		 *                 example: 2024-03-19T01:44:25.449Z
		 *           data:
		 *             type: object
		 *             example: {}
		 */

		/**
		 * @openapi
		 * /api/v1/auth/login:
		 *   description: Route to login
		 *   post:
		 *     tags:
		 *       - Auth
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             required:
		 *             -  email
		 *             -  password
		 *             properties:
		 *               email:
		 *                 type: string
		 *                 format: email,
		 *                 example: test@mail.com
		 *               password:
		 *                 type: string
		 *                 format: password,
		 *                 example: 12345678
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessAuth"
		 *       400:
		 *         description: Role is already registered
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorAuth"
		 */
		this.route.post(
			'/login',
			validationMiddleware(loginSchema),
			passport.authenticate('local', { session: false }),
			(_request: Request, _response: Response, next: NextFunction) => {
				try {
					ResponseModule.success(_response, _request.user);
				} catch (error) {
					next(error);
				}
			},
		);

		console.groupEnd();
		return this.route;
	}
}

export default AuthRoute;

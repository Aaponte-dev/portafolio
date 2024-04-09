import {
	emailSchema,
	productNameSchema,
	roleNameSchema,
} from '../schemas/utilSchema';
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { ResponseModule } from '../modules/response/responseModule';
import Routing from './createRouter';
import UtilController from '../modules/utils/utilController';
import validationMiddleware from '../middlewares/validationMiddleware';

class UtilRoute {
	// eslint-disable-next-line no-use-before-define
	private static instance: UtilRoute;

	private readonly utilController: UtilController;

	private readonly className = 'UTIL_ROUTE';

	private readonly route;

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.utilController = UtilController.getInstance();
		this.route = Routing.createRouting();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`UTIL_ROUTE:GET_INSTANCE`);
		if (!UtilRoute.instance) UtilRoute.instance = new UtilRoute();
		console.groupEnd();
		return UtilRoute.instance;
	}

	createRotes(): Router {
		console.group(`${this.className}:CREATE_ROUTES`);

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       ResponseSuccessUtil:
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
		 *             type: boolean
		 *             example: true
		 */

		/**
		 * @openapi
		 * /api/v1/util/product/product-name-available:
		 *   description: Route to verify if the product name is available
		 *   post:
		 *     tags:
		 *       - Util
		 *     security:
		 *       - bearerAuth: []
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             required:
		 *             -  productName
		 *             properties:
		 *               productName:
		 *                 type: string
		 *                 format: string,
		 *                 example: te
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessUtil"
		 */
		this.route.post(
			'/product/product-name-available',
			passport.authenticate('jwt', { session: false }),
			validationMiddleware(productNameSchema),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					ResponseModule.success(
						_response,
						await this.utilController.isProductNameAvailable(
							_request.body.productName,
						),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/util/role/role-name-available:
		 *   description: Route to verify if the name of the role is available
		 *   post:
		 *     tags:
		 *       - Util
		 *     security:
		 *       - bearerAuth: []
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             required:
		 *             -  roleName
		 *             properties:
		 *               roleName:
		 *                 type: string
		 *                 format: string,
		 *                 example: te
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessUtil"
		 */
		this.route.post(
			'/role/role-name-available',
			passport.authenticate('jwt', { session: false }),
			validationMiddleware(roleNameSchema),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					ResponseModule.success(
						_response,
						await this.utilController.isRoleNameAvailable(
							_request.body.roleName,
						),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/util/user/exist-email:
		 *   description: Route to verify if the email exists
		 *   post:
		 *     tags:
		 *       - Util
		 *     security:
		 *       - bearerAuth: []
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             required:
		 *             -  email
		 *             properties:
		 *               email:
		 *                 type: string
		 *                 format: email,
		 *                 example: test@mail.com
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessUtil"
		 */
		this.route.post(
			'/user/exist-email',
			passport.authenticate('jwt', { session: false }),
			validationMiddleware(emailSchema),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					ResponseModule.success(
						_response,
						await this.utilController.existEmail(_request.body.email),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		console.groupEnd();
		return this.route;
	}
}

export default UtilRoute;

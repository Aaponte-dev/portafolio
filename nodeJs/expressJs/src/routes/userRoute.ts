import { NextFunction, Request, Response, Router } from 'express';
import Actions from '../enums/actions';
import ClassValidatorModule from '../modules/classValidator/classValidatorModule';
import CommonService from '../modules/common/commonService';
import passport from 'passport';
import { ResponseModule } from '../modules/response/responseModule';
import Routing from './createRouter';
import UserController from '../modules/users/userController';
import UserDto from '../modules/users/dtos/userDto';
import UserPaginationDto from '../modules/users/dtos/userPaginationDto';
import UuidValidatorDto from '../modules/common/dtos/uuidValidatorDto';

class UserRoute {
	// eslint-disable-next-line no-use-before-define
	private static instance: UserRoute;

	private readonly className = 'USER_ROUTE';

	private readonly classValidatorModule: ClassValidatorModule;

	private readonly userController: UserController;

	private readonly route;

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.userController = UserController.getInstance();
		this.route = Routing.createRouting();
		this.classValidatorModule = ClassValidatorModule.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`USER_ROUTE:GET_INSTANCE`);
		if (!UserRoute.instance) UserRoute.instance = new UserRoute();
		console.groupEnd();
		return UserRoute.instance;
	}

	createRotes(): Router {
		console.group(`${this.className}:CREATE_ROUTES`);

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       User:
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
		 */

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       ResponseSuccessUser:
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
		 *             "$ref": "#/components/schemas/User"
		 *       ResponsePaginatedSuccessUser:
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
		 *             properties:
		 *               response:
		 *                 type: array
		 *                 items:
		 *                   "$ref": "#/components/schemas/User"
		 *               limit:
		 *                 type: number,
		 *                 example: 10
		 *               page:
		 *                 type: number,
		 *                 example: 1
		 *               total:
		 *                 type: number,
		 *                 example: 100
		 *       ResponseSuccessDeleteUser:
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
		 *             properties:
		 *               message:
		 *                 type: string,
		 *                 format: string,
		 *                 example: 'product.delete'
		 *       ResponseWithErrorUser:
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
		 * /api/v1/user:
		 *   description: Route to create the user
		 *   post:
		 *     tags:
		 *       - User
		 *     security:
		 *       - bearerAuth: []
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             required:
		 *             -  firstName
		 *             -  lastName
		 *             -  email
		 *             -  password
		 *             -  roleId
		 *             properties:
		 *               firstName:
		 *                 type: string
		 *                 format: string,
		 *                 example: Samuel
		 *               lastName:
		 *                 type: string
		 *                 format: string,
		 *                 example: Parra
		 *               email:
		 *                 type: string
		 *                 format: string,
		 *                 example: test@mail.com
		 *               password:
		 *                 type: string
		 *                 format: string,
		 *                 example: 12345678
		 *               roleId:
		 *                 type: string
		 *                 format: string,
		 *                 example: 04de96f7-fdfd-4c58-b85d-4247462a0ccc
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessUser"
		 *       400:
		 *         description: User is already registered
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorUser"
		 */
		this.route.post(
			'/',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const user = new UserDto();
					user.firstName = _request.body.firstName;
					user.lastName = _request.body.lastName;
					user.email = _request.body.email;
					user.password = _request.body.password;
					user.roleId = _request.body.roleId;
					await this.classValidatorModule.validate(user, Actions.CREATE);
					ResponseModule.success(
						_response,
						await this.userController.create(_request.body),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/user:
		 *   description: Route to get all users
		 *   get:
		 *     tags:
		 *       - User
		 *     security:
		 *       - bearerAuth: []
		 *     parameters:
		 *     - name: limit
		 *       in: query
		 *       description: Amount of elements by response
		 *       schema:
		 *         type: string
		 *     - name: page
		 *       in: query
		 *       description: Page to consult
		 *       schema:
		 *         type: string
		 *     - name: sortBy
		 *       in: query
		 *       description: Field by which to sort the query (firstName, email, createdAt)
		 *       schema:
		 *         type: string
		 *     - name: findBy
		 *       in: query
		 *       description: Field to search for in the consultation (firstName, email)
		 *       schema:
		 *         type: string
		 *     - name: value
		 *       in: query
		 *       description: Value to search by in the query
		 *       schema:
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponsePaginatedSuccessUser"
		 */
		this.route.get(
			'/',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const commonService = CommonService.getInstance();
					const params = commonService.convertParametersIntoNumericalFormat(
						_request.query as unknown as UserPaginationDto,
					) as unknown as UserPaginationDto;
					const userPaginationDto = new UserPaginationDto();
					userPaginationDto.limit = params.limit;
					userPaginationDto.page = params.page;
					userPaginationDto.findBy = params.findBy;
					userPaginationDto.sortBy = params.sortBy;
					userPaginationDto.value = params.value;
					await this.classValidatorModule.validate(userPaginationDto);
					ResponseModule.success(
						_response,
						await this.userController.find(params),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/user/{id}:
		 *   description: Route to consult the user
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     description: The user identifier
		 *     required: true
		 *     schema:
		 *       type: string
		 *   get:
		 *     tags:
		 *       - User
		 *     security:
		 *       - bearerAuth: []
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessUser"
		 *       400:
		 *         description: Product not found with the following ID
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorUser"
		 */
		this.route.get(
			'/:id',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const { id } = _request.params;
					const uuidValidator = new UuidValidatorDto();
					uuidValidator.id = id ?? '';
					await this.classValidatorModule.validate(uuidValidator);
					ResponseModule.success(
						_response,
						await this.userController.findById(id ?? ''),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/user/{id}:
		 *   description: Path for update user by id
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     required: true
		 *     description: The user identifier
		 *     schema:
		 *       type: string
		 *   put:
		 *     tags:
		 *       - User
		 *     security:
		 *       - bearerAuth: []
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             properties:
		 *               firstName:
		 *                 type: string
		 *                 format: string,
		 *                 example: Samuel
		 *               lastName:
		 *                 type: string
		 *                 format: string,
		 *                 example: Parra
		 *               email:
		 *                 type: string
		 *                 format: string,
		 *                 example: test@mail.com
		 *               password:
		 *                 type: integer
		 *                 format: integer,
		 *                 example: 12345678
		 *               rolId:
		 *                 type: string
		 *                 format: string,
		 *                 example: 04de96f7-fdfd-4c58-b85d-4247462a0ccc
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessUser"
		 *       400:
		 *         description: User is not found with the following ID
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorUser"
		 */
		this.route.put(
			'/:id',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const { id } = _request.params;
					const uuidValidator = new UuidValidatorDto();
					uuidValidator.id = id || '';
					await this.classValidatorModule.validate(uuidValidator);
					const body = _request.body;
					const user = new UserDto();
					user.firstName = _request.body.firstName;
					user.lastName = _request.body.lastName;
					user.email = _request.body.email;
					user.password = _request.body.password;
					user.roleId = _request.body.roleId;
					await this.classValidatorModule.validate(user, Actions.UPDATE);
					ResponseModule.success(
						_response,
						await this.userController.update(id || '', body),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/user/{id}:
		 *   description: Path for delete user by id
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     required: true
		 *     description: The user identifier
		 *     schema:
		 *       type: string
		 *   delete:
		 *     tags:
		 *       - User
		 *     security:
		 *       - bearerAuth: []
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessDeleteUser"
		 *       400:
		 *         description: User is not found with the following ID
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorUser"
		 */
		this.route.delete(
			'/:id',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const { id } = _request.params;
					const uuidValidator = new UuidValidatorDto();
					uuidValidator.id = id || '';
					await this.classValidatorModule.validate(uuidValidator);
					ResponseModule.success(
						_response,
						await this.userController.delete(id || ''),
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

export default UserRoute;

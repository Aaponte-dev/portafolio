import { NextFunction, Request, Response, Router } from 'express';
import Actions from '../enums/actions';
import ClassValidatorModule from '../modules/classValidator/classValidatorModule';
import CommonService from '../modules/common/commonService';
import { DeleteRoleResponse } from '../interfaces/roleInterface';
import passport from 'passport';
import { ResponseModule } from '../modules/response/responseModule';
import Role from '../entities/typeOrm/role';
import RoleController from '../modules/roles/roleController';
import { RoleDto } from '../modules/roles/dtos/roleDto';
import RolePaginationDto from '../modules/roles/dtos/rolePaginationDto';
import Routing from './createRouter';
import UuidValidatorDto from '../modules/common/dtos/uuidValidatorDto';

class RoleRoute {
	// eslint-disable-next-line no-use-before-define
	private static instance: RoleRoute;

	private readonly roleController: RoleController;

	private readonly classValidatorModule: ClassValidatorModule;

	private readonly className = 'ROLE_ROUTE';

	private readonly route;

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.roleController = RoleController.getInstance();
		this.route = Routing.createRouting();
		this.classValidatorModule = ClassValidatorModule.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`ROLE_ROUTE:GET_INSTANCE`);
		if (!RoleRoute.instance) RoleRoute.instance = new RoleRoute();
		console.groupEnd();
		return RoleRoute.instance;
	}

	createRotes(): Router {
		console.group(`${this.className}:CREATE_ROUTES`);

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       Role:
		 *         type: object,
		 *         properties:
		 *           id:
		 *             type: string,
		 *             format: uuid,
		 *             example: 6406f8cf-3349-483c-8051-83a5d7f44888
		 *           name:
		 *             type: string,
		 *             format: string,
		 *             example: ADMIN
		 *           position:
		 *             type: integer,
		 *             format: integer,
		 *             example: 1
		 *           users:
		 *             type: array,
		 *             items:
		 *               "$ref": "#/components/schemas/User"
		 *           createdAt:
		 *             type: string,
		 *             format: date,
		 *             example: 2024-03-16T01:44:25.449Z
		 */

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       ResponseSuccess:
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
		 *             "$ref": "#/components/schemas/Role"
		 *       ResponsePaginatedSuccess:
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
		 *                   "$ref": "#/components/schemas/Role"
		 *               limit:
		 *                 type: number,
		 *                 example: 10
		 *               page:
		 *                 type: number,
		 *                 example: 1
		 *               total:
		 *                 type: number,
		 *                 example: 100
		 *       ResponseSuccessDelete:
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
		 *       ResponseWithError:
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
		 * /api/v1/role:
		 *   description: Route to create the role
		 *   post:
		 *     tags:
		 *       - Role
		 *     security:
		 *       - bearerAuth: []
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             required:
		 *             -  name
		 *             -  position
		 *             properties:
		 *               name:
		 *                 type: string
		 *                 format: string,
		 *                 example: ADMIN
		 *               position:
		 *                 type: integer
		 *                 format: integer,
		 *                 example: 1
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccess"
		 *       400:
		 *         description: Role is already registered
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithError"
		 */
		this.route.post(
			'/',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const role = new RoleDto();
					role.name = _request.body.name;
					role.position = _request.body.position;
					await this.classValidatorModule.validate(role, Actions.CREATE);
					ResponseModule.success<Role>(
						_response,
						await this.roleController.create(_request.body),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/role:
		 *   description: Route to get all roles
		 *   get:
		 *     tags:
		 *       - Role
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
		 *       description: Field by which to sort the query (name, createdAt)
		 *       schema:
		 *         type: string
		 *     - name: findBy
		 *       in: query
		 *       description: Field to search for in the consultation (name)
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
		 *               "$ref": "#/components/schemas/ResponsePaginatedSuccess"
		 */
		this.route.get(
			'/',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const commonService = CommonService.getInstance();
					const params = commonService.convertParametersIntoNumericalFormat(
						_request.query as unknown as RolePaginationDto,
					) as unknown as RolePaginationDto;
					const rolePaginationDto = new RolePaginationDto();
					rolePaginationDto.limit = params.limit;
					rolePaginationDto.page = params.page;
					rolePaginationDto.findBy = params.findBy;
					rolePaginationDto.sortBy = params.sortBy;
					rolePaginationDto.value = params.value;
					await this.classValidatorModule.validate(rolePaginationDto);
					ResponseModule.success(
						_response,
						await this.roleController.find(params),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/role/{id}:
		 *   description: Route to consult the role
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     description: The role identifier
		 *     required: true
		 *     schema:
		 *       type: string
		 *   get:
		 *     tags:
		 *       - Role
		 *     security:
		 *       - bearerAuth: []
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccess"
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
					ResponseModule.success<Role | null>(
						_response,
						await this.roleController.findById(id ?? ''),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/role/{id}:
		 *   description: Path for update role by id
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     required: true
		 *     description: The role identifier
		 *     schema:
		 *       type: string
		 *   put:
		 *     tags:
		 *       - Role
		 *     security:
		 *       - bearerAuth: []
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             properties:
		 *               name:
		 *                 type: string
		 *                 format: string,
		 *                 example: ADMIN
		 *               position:
		 *                 type: integer
		 *                 format: integer,
		 *                 example: 1
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccess"
		 *       400:
		 *         description: Role is not found with the following ID
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithError"
		 */
		this.route.put(
			'/:id',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const { id } = _request.params;
					const uuidValidator = new UuidValidatorDto();
					uuidValidator.id = id ?? '';
					await this.classValidatorModule.validate(uuidValidator);
					const body = _request.body;
					const role = new RoleDto();
					role.name = _request.body.name;
					role.position = _request.body.position;
					await this.classValidatorModule.validate(role, Actions.UPDATE);
					ResponseModule.success<Role | undefined>(
						_response,
						await this.roleController.update(id ?? '', body),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/role/{id}:
		 *   description: Path for delete role by id
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     required: true
		 *     description: The role identifier
		 *     schema:
		 *       type: string
		 *   delete:
		 *     tags:
		 *       - Role
		 *     security:
		 *       - bearerAuth: []
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessDelete"
		 *       400:
		 *         description: Role is not found with the following ID
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithError"
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
					ResponseModule.success<DeleteRoleResponse>(
						_response,
						await this.roleController.delete(id || ''),
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

export default RoleRoute;

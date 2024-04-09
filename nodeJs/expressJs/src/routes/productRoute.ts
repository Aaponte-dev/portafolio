import { NextFunction, Request, Response, Router } from 'express';
import Actions from '../enums/actions';

import ClassValidatorModule from '../modules/classValidator/classValidatorModule';
import CommonService from '../modules/common/commonService';
import ObjectIdValidatorDto from '../modules/common/dtos/objectIdValidatorDto';
import passport from 'passport';
import ProductController from '../modules/products/productController';
import ProductDto from '../modules/products/dtos/productDto';
import ProductPaginationDto from '../modules/products/dtos/productPaginationDto';
import { ResponseModule } from '../modules/response/responseModule';
import Routing from './createRouter';

class ProductRoute {
	// eslint-disable-next-line no-use-before-define
	private static instance: ProductRoute;

	private readonly className = 'PRODUCT_ROUTE';

	private readonly classValidatorModule: ClassValidatorModule;

	private readonly productController: ProductController;

	private readonly route;

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.productController = ProductController.getInstance();
		this.route = Routing.createRouting();
		this.classValidatorModule = ClassValidatorModule.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`PRODUCT_ROUTE:GET_INSTANCE`);
		if (!ProductRoute.instance) ProductRoute.instance = new ProductRoute();
		console.groupEnd();
		return ProductRoute.instance;
	}

	createRotes(): Router {
		console.group(`${this.className}:CREATE_ROUTES`);

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       Product:
		 *         type: object,
		 *         properties:
		 *           _id:
		 *             type: string,
		 *             format: uuid,
		 *             example: 66063186a32d15fbd30a92b3
		 *           name:
		 *             type: string,
		 *             format: string,
		 *             example: Product test
		 *           description:
		 *             type: string,
		 *             format: string,
		 *             example: Product test at home
		 *           quantity:
		 *             type: integer,
		 *             format: integer,
		 *             example: 55
		 *           price:
		 *             type: integer,
		 *             format: integer,
		 *             example: 100
		 *           createdAt:
		 *             type: string,
		 *             format: date,
		 *             example: 2024-03-16T01:44:25.449Z
		 */

		/**
		 * @openapi
		 *   components:
		 *     schemas:
		 *       ResponseSuccessProduct:
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
		 *             "$ref": "#/components/schemas/Product"
		 *       ResponsePaginatedSuccessProduct:
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
		 *                   "$ref": "#/components/schemas/Product"
		 *               limit:
		 *                 type: number,
		 *                 example: 10
		 *               page:
		 *                 type: number,
		 *                 example: 1
		 *               total:
		 *                 type: number,
		 *                 example: 100
		 *       ResponseSuccessProductDeleteProduct:
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
		 *       ResponseWithErrorProduct:
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
		 *       ResponseSuccessDeleteProduct:
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
		 */

		/**
		 * @openapi
		 * /api/v1/product:
		 *   description: Route to create the product
		 *   post:
		 *     tags:
		 *       - Product
		 *     security:
		 *       - bearerAuth: []
		 *     requestBody:
		 *       content:
		 *         'application/json':
		 *           schema:
		 *             type: object
		 *             required:
		 *             -  name
		 *             -  description
		 *             -  quantity
		 *             -  price
		 *             properties:
		 *               name:
		 *                 type: string
		 *                 format: string,
		 *                 example: Product Test
		 *               description:
		 *                 type: string
		 *                 format: string,
		 *                 example: Product description test
		 *               quantity:
		 *                 type: integer
		 *                 format: integer,
		 *                 example: 10
		 *               price:
		 *                 type: integer
		 *                 format: integer,
		 *                 example: 100
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessProduct"
		 *       400:
		 *         description: Product is already registered
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorProduct"
		 */
		this.route.post(
			'/',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const product = new ProductDto();
					product.name = _request.body.name;
					product.description = _request.body.description;
					product.price = _request.body.price;
					product.quantity = _request.body.quantity;
					await this.classValidatorModule.validate(product, Actions.CREATE);
					ResponseModule.success(
						_response,
						await this.productController.create(_request.body),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/product:
		 *   description: Route to get all products
		 *   get:
		 *     tags:
		 *       - Product
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
		 *       description: Field by which to sort the query (name, description, createdAt)
		 *       schema:
		 *         type: string
		 *     - name: findBy
		 *       in: query
		 *       description: Field to search for in the consultation (name, description)
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
		 *               "$ref": "#/components/schemas/ResponsePaginatedSuccessProduct"
		 */
		this.route.get(
			'/',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const commonService = CommonService.getInstance();
					const params = commonService.convertParametersIntoNumericalFormat(
						_request.query as unknown as ProductPaginationDto,
					) as unknown as ProductPaginationDto;
					const productPaginationDto = new ProductPaginationDto();
					productPaginationDto.limit = params.limit;
					productPaginationDto.page = params.page;
					productPaginationDto.findBy = params.findBy;
					productPaginationDto.sortBy = params.sortBy;
					productPaginationDto.value = params.value;
					await this.classValidatorModule.validate(productPaginationDto);
					ResponseModule.success(
						_response,
						await this.productController.find(params),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/product/{id}:
		 *   description: Route to consult the product
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     description: The product identifier
		 *     required: true
		 *     schema:
		 *       type: string
		 *   get:
		 *     tags:
		 *       - Product
		 *     security:
		 *       - bearerAuth: []
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessProduct"
		 *       400:
		 *         description: Product not found with the following ID
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorProduct"
		 */
		this.route.get(
			'/:id',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const { id } = _request.params;
					const objectIdValidator = new ObjectIdValidatorDto();
					objectIdValidator.id = id ?? '';
					await this.classValidatorModule.validate(objectIdValidator);
					ResponseModule.success(
						_response,
						await this.productController.findById(id ?? ''),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/product/{id}:
		 *   description: Path for update product by id
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     required: true
		 *     description: The product identifier
		 *     schema:
		 *       type: string
		 *   put:
		 *     tags:
		 *       - Product
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
		 *                 example: Product Test
		 *               description:
		 *                 type: string
		 *                 format: string,
		 *                 example: Product description test
		 *               quantity:
		 *                 type: integer
		 *                 format: integer,
		 *                 example: 10
		 *               price:
		 *                 type: integer
		 *                 format: integer,
		 *                 example: 100
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessProduct"
		 *       400:
		 *         description: Product is not found with the following ID
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorProduct"
		 */
		this.route.put(
			'/:id',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const { id } = _request.params;
					const objectIdValidator = new ObjectIdValidatorDto();
					objectIdValidator.id = id ?? '';
					await this.classValidatorModule.validate(objectIdValidator);
					const body = _request.body;
					const product = new ProductDto();
					product.name = _request.body.name;
					product.description = _request.body.description;
					product.price = _request.body.price;
					product.quantity = _request.body.quantity;
					await this.classValidatorModule.validate(product, Actions.UPDATE);
					ResponseModule.success(
						_response,
						await this.productController.update(id ?? '', body),
					);
				} catch (error) {
					next(error);
				}
			},
		);

		/**
		 * @openapi
		 * /api/v1/product/{id}:
		 *   description: Path for delete product by id
		 *   parameters:
		 *   - name: id
		 *     in: path
		 *     required: true
		 *     description: The product identifier
		 *     schema:
		 *       type: string
		 *   delete:
		 *     tags:
		 *       - Product
		 *     security:
		 *       - bearerAuth: []
		 *     responses:
		 *       200:
		 *         description: Ok
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseSuccessDeleteProduct"
		 *       400:
		 *         description: Product is not found with the following ID
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               "$ref": "#/components/schemas/ResponseWithErrorProduct"
		 */
		this.route.delete(
			'/:id',
			passport.authenticate('jwt', { session: false }),
			async (_request: Request, _response: Response, next: NextFunction) => {
				try {
					const { id } = _request.params;
					const objectIdValidator = new ObjectIdValidatorDto();
					objectIdValidator.id = id ?? '';
					await this.classValidatorModule.validate(objectIdValidator);
					ResponseModule.success(
						_response,
						await this.productController.delete(id ?? ''),
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

export default ProductRoute;

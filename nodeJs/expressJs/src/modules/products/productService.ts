import {
	CreateProductResponseInterface,
	FindProductInterface,
	ProductInterface,
	UpdateProductInterface,
} from '../../interfaces/productInterface';
import CommonService from '../common/commonService';
import ProductModel from '../../entities/mongoDb/product';
import ProductPaginationDto from './dtos/productPaginationDto';

export class ProductService {
	// eslint-disable-next-line no-use-before-define
	private static instance: ProductService;

	private readonly productModel: typeof ProductModel;

	private readonly commonService: CommonService;

	private readonly className = 'PRODUCT_SERVICE';

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.productModel = ProductModel;
		this.commonService = CommonService.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group('PRODUCT_SERVICE:GET_INSTANCE');
		if (!ProductService.instance)
			ProductService.instance = new ProductService();
		console.groupEnd();
		return ProductService.instance;
	}

	async create(
		productInformation: ProductInterface,
	): Promise<CreateProductResponseInterface> {
		console.group(`${this.className}:CREATE`);
		productInformation.name = productInformation.name.toLocaleLowerCase();
		productInformation.description =
			productInformation.description.toLocaleLowerCase();
		await this.isProductNameAvailable(productInformation.name, true);

		const response = await this.productModel.create(productInformation);
		console.groupEnd();
		return response;
	}

	async find({
		limit = 20,
		page = 1,
		sortBy,
		findBy,
		value,
	}: ProductPaginationDto): Promise<FindProductInterface> {
		console.group(`${this.className}:FIND`);
		let newSortBy = 'createdAt';
		let whereCondition = {};
		if (sortBy) newSortBy = sortBy;
		if (value && findBy)
			whereCondition = {
				// eslint-disable-next-line new-cap
				[`${findBy}`]: new RegExp(value, 'i'),
			};

		const amountOfElements = await this.productModel.countDocuments({});
		const response =
			await this.productModel.find<CreateProductResponseInterface>(
				whereCondition,
				'',
				{
					limit,
					skip: this.commonService.calculateSkip(page, limit),
					sort: newSortBy,
				},
			);
		console.groupEnd();
		return {
			response,
			limit,
			page,
			total: amountOfElements,
		};
	}

	async findById(id: string): Promise<CreateProductResponseInterface | null> {
		console.group(`${this.className}:FIND_BY_ID`);
		const response = await this.productModel.findById(id);
		if (!response)
			this.commonService.createError(
				`Product not found with the following ID: ${id}`,
			);
		console.groupEnd();
		return response;
	}

	async update(
		id: string,
		body: UpdateProductInterface,
	): Promise<CreateProductResponseInterface | undefined | null> {
		console.group(`${this.className}:UPDATE`);
		let response;
		if (await this.findById(id)) {
			if (body.name) body.name = body.name.toLocaleLowerCase();
			if (body.description)
				body.description = body.description.toLocaleLowerCase();

			response = await this.productModel.findByIdAndUpdate(id, body, {
				new: true,
			});
		}
		console.groupEnd();
		return response;
	}

	async delete(id: string): Promise<void> {
		console.group(`${this.className}:DELETE`);
		await this.productModel.deleteOne({ _id: id });
		console.groupEnd();
	}

	async isProductNameAvailable(
		productName: string,
		itThrowError = false,
	): Promise<boolean> {
		console.group(`${this.className}:IS_PRODUCT_NAME_AVAILABLE`);
		const response = await this.productModel.exists({
			name: productName,
		});
		if (response !== null && itThrowError)
			this.commonService.createError(
				`Product name not available: ${productName}`,
			);
		console.groupEnd();
		return response === null;
	}
}

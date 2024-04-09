import {
	CreateProductResponseInterface,
	FindProductInterface,
	ProductInterface,
} from '../../interfaces/productInterface';
import ProductPaginationDto from './dtos/productPaginationDto';
import { ProductService } from './productService';

class ProductController {
	// eslint-disable-next-line no-use-before-define
	private static instance: ProductController;

	private productService: ProductService;

	private readonly className = 'PRODUCT_CONTROLLER';

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.productService = ProductService.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`PRODUCT_CONTROLLER:GET_INSTANCE`);
		if (!ProductController.instance)
			ProductController.instance = new ProductController();
		console.groupEnd();
		return ProductController.instance;
	}

	async create(
		productInformation: ProductInterface,
	): Promise<CreateProductResponseInterface> {
		console.group(`${this.className}:CREATE`);
		const response = await this.productService.create(productInformation);
		console.groupEnd();
		return response;
	}

	async find(query: ProductPaginationDto): Promise<FindProductInterface> {
		console.group(`${this.className}:FIND`);
		const response = await this.productService.find(query);
		console.groupEnd();
		return response;
	}

	async findById(id: string): Promise<CreateProductResponseInterface | null> {
		console.group(`${this.className}:FIND_BY_ID`);
		const response = await this.productService.findById(id);
		console.groupEnd();
		return response;
	}

	async update(
		id: string,
		productInformation: ProductInterface,
	): Promise<CreateProductResponseInterface | undefined | null> {
		console.group(`${this.className}:UPDATE`);
		const response = await this.productService.update(id, productInformation);
		console.groupEnd();
		return response;
	}

	async delete(id: string) {
		console.group(`${this.className}:DELETE`);
		await this.productService.delete(id);
		const response = { message: 'product.delete' };
		console.groupEnd();
		return response;
	}
}

export default ProductController;

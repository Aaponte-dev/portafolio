import { ProductService } from './../products/productService';
import RoleService from '../roles/roleService';
import { UserService } from './../users/userService';
class UtilService {
	// eslint-disable-next-line no-use-before-define
	private static instance: UtilService;

	private readonly className = 'UTIL_SERVICE';

	private readonly userService: UserService;

	private readonly productService: ProductService;

	private readonly roleService: RoleService;

	private constructor() {
		this.userService = UserService.getInstance();
		this.productService = ProductService.getInstance();
		this.roleService = RoleService.getInstance();
	}

	static getInstance() {
		console.group(`UTIL_SERVICE:GET_INSTANCE`);
		if (!UtilService.instance) UtilService.instance = new UtilService();
		console.groupEnd();
		return UtilService.instance;
	}

	async isProductNameAvailable(productName: string): Promise<boolean> {
		console.group(`${this.className}:IS_PRODUCT_NAME_AVAILABLE`);
		const response =
			await this.productService.isProductNameAvailable(productName);
		console.groupEnd();
		return response;
	}

	async isRoleNameAvailable(roleName: string): Promise<boolean> {
		console.group(`${this.className}:IS_ROLE_NAME_AVAILABLE`);
		const response = await this.roleService.isRoleNameAvailable(roleName);
		console.groupEnd();
		return response;
	}

	async existEmail(email: string): Promise<boolean> {
		console.group(`${this.className}:EXIST_EMAIL`);
		const response = await this.userService.existEmail(email);
		console.groupEnd();
		return response;
	}
}

export default UtilService;

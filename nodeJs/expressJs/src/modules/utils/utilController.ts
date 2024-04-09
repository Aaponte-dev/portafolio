import UtilService from './utilService';

class UtilController {
	// eslint-disable-next-line no-use-before-define
	private static instance: UtilController;

	private readonly utilService: UtilService;

	private readonly className = 'UTIL_CONTROLLER';

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.utilService = UtilService.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`UTIL_CONTROLLER:GET_INSTANCE`);
		if (!UtilController.instance)
			UtilController.instance = new UtilController();
		console.groupEnd();
		return UtilController.instance;
	}

	async isProductNameAvailable(productName: string): Promise<boolean> {
		console.group(`${this.className}:IS_PRODUCT_NAME_AVAILABLE`);
		const response = await this.utilService.isProductNameAvailable(productName);
		console.groupEnd();
		return response;
	}

	async isRoleNameAvailable(roleName: string): Promise<boolean> {
		console.group(`${this.className}:IS_ROLE_NAME_AVAILABLE`);
		const response = await this.utilService.isRoleNameAvailable(roleName);
		console.groupEnd();
		return response;
	}

	async existEmail(email: string): Promise<boolean> {
		console.group(`${this.className}:EXIST_EMAIL`);
		const response = await this.utilService.existEmail(email);
		console.groupEnd();
		return response;
	}
}

export default UtilController;

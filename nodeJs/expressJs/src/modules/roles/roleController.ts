import {
	DeleteRoleResponse,
	FindRoleInterface,
	RoleInterface,
	UpdateRoleInterface,
} from '../../interfaces/roleInterface';
import Role from '../../entities/typeOrm/role';
import RolePaginationDto from './dtos/rolePaginationDto';
import RoleService from './roleService';

class RoleController {
	// eslint-disable-next-line no-use-before-define
	private static instance: RoleController;

	private readonly className = 'ROLE_CONTROLLER';

	private roleService: RoleService;

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.roleService = RoleService.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`ROLE_CONTROLLER:GET_INSTANCE`);
		if (!RoleController.instance)
			RoleController.instance = new RoleController();
		console.groupEnd();
		return RoleController.instance;
	}

	async create(roleInformation: RoleInterface): Promise<Role> {
		console.group(`${this.className}:CREATE`);
		const response = await this.roleService.create(roleInformation);
		console.groupEnd();
		return response;
	}

	async find(query: RolePaginationDto): Promise<FindRoleInterface> {
		console.group(`${this.className}:FIND`);

		const response = await this.roleService.find(query);
		console.groupEnd();
		return response;
	}

	async findById(id: string): Promise<Role | null> {
		console.group(`${this.className}:FIND_BY_ID`);
		const response = await this.roleService.findById(id);
		console.groupEnd();
		return response;
	}

	async update(
		id: string,
		roleInformation: UpdateRoleInterface,
	): Promise<Role | undefined> {
		console.group(`${this.className}:UPDATE`);
		const response = await this.roleService.update(id, roleInformation);
		console.groupEnd();
		return response;
	}

	async delete(id: string): Promise<DeleteRoleResponse> {
		console.group(`${this.className}:DELETE`);
		await this.roleService.delete(id);
		const response = { message: 'product.delete' };
		console.groupEnd();
		return response;
	}
}

export default RoleController;

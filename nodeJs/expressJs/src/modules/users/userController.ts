import {
	CreateUserResponseInterface,
	FindUserInterface,
	UpdateUserInterface,
	UserInterface,
	UserNotCreatedResponseInterface,
} from '../../interfaces/userInterface';
import User from '../../entities/typeOrm/user';
import UserPaginationDto from './dtos/userPaginationDto';
import { UserService } from './userService';

class UserController {
	// eslint-disable-next-line no-use-before-define
	private static instance: UserController;

	private readonly className = 'USER_CONTROLLER';

	private userService: UserService;

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.userService = UserService.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`USER_CONTROLLER:GET_INSTANCE`);
		if (!UserController.instance)
			UserController.instance = new UserController();
		console.groupEnd();
		return UserController.instance;
	}

	async create(
		userInformation: UserInterface,
	): Promise<CreateUserResponseInterface | UserNotCreatedResponseInterface> {
		console.group(`${this.className}:CREATE`);
		const response = await this.userService.create(userInformation);
		console.groupEnd();
		return response;
	}

	async find(query: UserPaginationDto): Promise<FindUserInterface> {
		console.group(`${this.className}:FIND`);
		const response = await this.userService.find(query);
		console.groupEnd();
		return response;
	}

	async findById(id: string): Promise<CreateUserResponseInterface | null> {
		console.group(`${this.className}:FIND_BY_ID`);
		const response = await this.userService.findById(id);
		console.groupEnd();
		return response;
	}

	async update(
		id: string,
		userInformation: UpdateUserInterface,
	): Promise<User | undefined | null> {
		console.group(`${this.className}:UPDATE`);
		const response = await this.userService.update(id, userInformation);
		console.groupEnd();
		return response;
	}

	async delete(id: string) {
		console.group(`${this.className}:DELETE`);
		await this.userService.delete(id);
		const response = { message: 'product.delete' };
		console.groupEnd();
		return response;
	}
}

export default UserController;

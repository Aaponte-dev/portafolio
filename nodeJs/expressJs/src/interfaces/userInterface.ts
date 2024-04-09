import PaginationResponseInterface from './paginationResponseInterface';

interface UserInterface {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	roleId: string;
}

interface CreateUserResponseInterface
	extends Omit<UserInterface, 'roleId' | 'password'> {
	id: string;
}

interface UpdateUserInterface extends Partial<UserInterface> {}

interface UserNotCreatedResponseInterface {
	message: string;
}

interface FindUserInterface
	extends PaginationResponseInterface<CreateUserResponseInterface> {}

export {
	UserInterface,
	CreateUserResponseInterface,
	FindUserInterface,
	UserNotCreatedResponseInterface,
	UpdateUserInterface,
};

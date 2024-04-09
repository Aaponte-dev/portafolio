import PaginationResponseInterface from './paginationResponseInterface';

interface RoleInterface {
	name: string;
	position: number;
}

interface CreateRoleResponseInterface extends RoleInterface {
	id: string;
}

interface FindRoleInterface
	extends PaginationResponseInterface<CreateRoleResponseInterface> {}

interface UpdateRoleInterface extends Partial<RoleInterface> {}

interface DeleteRoleResponse {
	message: string;
}

export {
	RoleInterface,
	FindRoleInterface,
	UpdateRoleInterface,
	DeleteRoleResponse,
};

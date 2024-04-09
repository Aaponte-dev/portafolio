import { DataSource, ILike } from 'typeorm';
import {
	FindRoleInterface,
	RoleInterface,
	UpdateRoleInterface,
} from '../../interfaces/roleInterface';
import CommonService from '../common/commonService';
import Role from '../../entities/typeOrm/role';
import RolePaginationDto from './dtos/rolePaginationDto';
import TypeOrmModule from '../typeOrm/typeOrmModule';

class RoleService {
	private readonly className = 'ROLE_SERVICE';

	// eslint-disable-next-line no-use-before-define
	private static instance: RoleService;

	private readonly roleRepository;

	private readonly connection: DataSource;

	private readonly commonService: CommonService;

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		const typeOrmModule = TypeOrmModule.getInstance();
		this.connection = typeOrmModule.getConnection();
		this.roleRepository = this.connection.getRepository(Role);
		this.commonService = CommonService.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`ROLE_SERVICE:GET_INSTANCE`);
		if (!RoleService.instance) RoleService.instance = new RoleService();
		console.groupEnd();
		return RoleService.instance;
	}

	async create(roleInformation: RoleInterface): Promise<Role> {
		console.group(`${this.className}:CREATE`);
		await this.isRoleNameAvailable(roleInformation.name, true);
		roleInformation.name = roleInformation.name.toUpperCase();
		const response = await this.roleRepository.save(roleInformation);
		console.groupEnd();
		return response;
	}

	async find({
		limit = 20,
		page = 1,
		sortBy,
		findBy,
		value,
	}: RolePaginationDto): Promise<FindRoleInterface> {
		console.group(`${this.className}:FIND`);
		let newSortBy = 'position';
		let whereCondition = {};
		if (sortBy) newSortBy = sortBy;
		if (value && findBy)
			whereCondition = {
				// eslint-disable-next-line new-cap
				[`${findBy}`]: ILike(`%${value}%`),
			};

		const [response, amountOfElements] = await this.roleRepository.findAndCount(
			{
				skip: this.commonService.calculateSkip(page, limit),
				take: limit,
				order: {
					[`${newSortBy}`]: 'ASC',
				},
				where: whereCondition,
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

	async findById(id: string, itThrowError = false): Promise<Role | null> {
		console.group(`${this.className}:FIND_BY_ID`);

		this.commonService.verifyFieldValue('id', id);
		const response = await this.roleRepository.findOneBy({ id });

		if (!response && itThrowError)
			this.commonService.createError(
				`Role is not found with the following ID: ${id}`,
			);

		console.groupEnd();
		return response;
	}

	async update(
		id: string,
		roleInformation: UpdateRoleInterface,
	): Promise<Role | undefined> {
		console.group(`${this.className}:UPDATE`);
		let response;
		const role = await this.findById(id, true);

		if (role) {
			if (roleInformation.name)
				roleInformation.name = roleInformation.name.toUpperCase();
			const request = this.roleRepository.merge(role, roleInformation);
			response = await this.roleRepository.save(request);
		}
		console.groupEnd();
		return response;
	}

	async delete(id: string): Promise<void> {
		console.group(`${this.className}:DELETE`);
		const role = await this.findById(id, true);
		if (role) await this.roleRepository.delete({ id });
		console.groupEnd();
	}

	async isRoleNameAvailable(
		productName: string,
		itThrowError = false,
	): Promise<boolean> {
		console.group(`${this.className}:IS_ROLE_NAME_AVAILABLE`);
		const response = await this.roleRepository.exists({
			where: {
				name: productName.toUpperCase(),
			},
		});
		if (response && itThrowError)
			this.commonService.createError('Role is already registered');

		console.groupEnd();
		return !response;
	}
}

export default RoleService;

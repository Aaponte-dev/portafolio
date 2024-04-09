import {
	CreateUserResponseInterface,
	FindUserInterface,
	UpdateUserInterface,
	UserInterface,
	UserNotCreatedResponseInterface,
} from '../../interfaces/userInterface';
import { DataSource, ILike } from 'typeorm';
import bcrypt from 'bcrypt';
import CommonService from '../common/commonService';
import RoleService from '../roles/roleService';
import TypeOrmModule from '../typeOrm/typeOrmModule';
import User from '../../entities/typeOrm/user';
import UserPaginationDto from './dtos/userPaginationDto';

export class UserService {
	// eslint-disable-next-line no-use-before-define
	private static instance: UserService;

	private readonly userRepository;

	private readonly className = 'USER_SERVICE';

	private readonly connection: DataSource;

	private readonly commonService: CommonService;

	private readonly roleService: RoleService;

	constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		const typeOrmModule = TypeOrmModule.getInstance();
		this.connection = typeOrmModule.getConnection();

		this.userRepository = this.connection.getRepository(User);
		this.commonService = CommonService.getInstance();
		this.roleService = RoleService.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`USER_SERVICE:GET_INSTANCE`);
		if (!UserService.instance) UserService.instance = new UserService();
		console.groupEnd();
		return UserService.instance;
	}

	async create({
		email,
		roleId,
		...otherUserInformation
	}: UserInterface): Promise<
		CreateUserResponseInterface | UserNotCreatedResponseInterface
	> {
		console.group(`${this.className}:CREATE`);

		let response;
		const userNotCreated = {
			message: 'User not created',
		};
		await this.existEmail(email, true);

		otherUserInformation.firstName =
			otherUserInformation.firstName.toLocaleLowerCase();
		otherUserInformation.lastName =
			otherUserInformation.lastName.toLocaleLowerCase();
		otherUserInformation.password = await this.encryptPassword(
			otherUserInformation.password,
		);

		const role = await this.roleService.findById(roleId, true);
		if (role) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...otherFields } = await this.userRepository.save({
				...otherUserInformation,
				role,
				email,
			});
			response = otherFields;
		}

		console.groupEnd();
		return response || userNotCreated;
	}

	async find({
		limit = 20,
		page = 1,
		sortBy,
		findBy,
		value,
	}: UserPaginationDto): Promise<FindUserInterface> {
		console.group(`${this.className}:FIND`);
		let newSortBy = 'createdAt';
		let whereCondition = {};
		if (sortBy) newSortBy = sortBy;
		if (value && findBy)
			whereCondition = {
				// eslint-disable-next-line new-cap
				[`${findBy}`]: ILike(`%${value}%`),
			};

		const [response, amountOfElements] = await this.userRepository.findAndCount(
			{
				take: limit,
				skip: this.commonService.calculateSkip(page, limit),
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

	async findById(id: string): Promise<User | null> {
		console.group(`${this.className}:FIND_BY_ID`);
		const response = await this.userRepository.findOneBy({ id });
		if (!response)
			this.commonService.createError(
				`Product not found with the following ID: ${id}`,
			);
		console.groupEnd();
		return response;
	}

	// eslint-disable-next-line complexity
	async update(
		id: string,
		body: UpdateUserInterface,
	): Promise<User | undefined | null> {
		console.group(`${this.className}:UPDATE`);
		let response;
		const user = await this.findById(id);

		if (user) {
			if (body.firstName) body.firstName = body.firstName.toLocaleLowerCase();
			if (body.lastName) body.lastName = body.lastName.toLocaleLowerCase();
			if (body.email) body.email = body.email.toLocaleLowerCase();
			if (body.password)
				body.password = await this.encryptPassword(body.password);
			const request = this.userRepository.merge(user, body);
			response = await this.userRepository.save(request);
		}

		console.groupEnd();
		return response;
	}

	async delete(id: string): Promise<void> {
		console.group(`${this.className}:DELETE`);
		const user = await this.findById(id);
		if (user) await this.userRepository.delete({ id });
		console.groupEnd();
	}

	async findByEmail(email: string): Promise<User | null> {
		console.group(`${this.className}:FIND_BY_EMAIL`);
		const response = await this.userRepository.findOneBy({ email });
		console.groupEnd();
		return response;
	}

	async existEmail(email: string, itThrowError = false): Promise<boolean> {
		console.group(`${this.className}:EXIST_EMAIL`);
		this.commonService.verifyFieldValue('email', email);

		const response = await this.userRepository.exists({
			where: {
				email: email.toLowerCase(),
			},
		});

		if (response && itThrowError)
			this.commonService.createError('Email is already registered');

		console.groupEnd();
		return response;
	}

	async encryptPassword(password: string): Promise<string> {
		console.group(`${this.className}:ENCRYPT_PASSWORD`);
		const response = await bcrypt.hash(password, 10);
		console.groupEnd();
		return response;
	}
}

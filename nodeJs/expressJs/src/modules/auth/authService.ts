import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import CommonService from '../common/commonService';
import EnvironmentVariables from '../../configs/environmentVariables';
import jwt from 'jsonwebtoken';
import LoginInterface from '../../interfaces/loginInterface';
import User from '../../entities/typeOrm/user';
import { UserService } from '../users/userService';

class AuthService {
	// eslint-disable-next-line no-use-before-define
	private static instance: AuthService;

	private readonly userService: UserService;

	private readonly commonService: CommonService;

	private readonly environmentVariables: EnvironmentVariables;

	private readonly className = 'AUTH_SERVICE';

	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.userService = UserService.getInstance();
		this.commonService = CommonService.getInstance();
		this.environmentVariables = EnvironmentVariables.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group(`USER_SERVICE:GET_INSTANCE`);
		if (!AuthService.instance) AuthService.instance = new AuthService();
		console.groupEnd();
		return AuthService.instance;
	}

	async login({ email, password }: LoginInterface) {
		console.group(`${this.className}:LOGIN`);
		const user = await this.userService.findByEmail(email);

		if (!user) {
			console.error('User not found');
			this.commonService.createError(
				ReasonPhrases.UNAUTHORIZED,
				StatusCodes.UNAUTHORIZED,
			);
		}

		const { password: passportEncrypted, ...userData } =
			user as unknown as User;
		const result = this.comparePasswords(password, passportEncrypted);

		if (!result) {
			console.error('Password incorrect');
			this.commonService.createError(
				ReasonPhrases.UNAUTHORIZED,
				StatusCodes.UNAUTHORIZED,
			);
		}

		const secret = this.environmentVariables.getValues().project.jwt
			.secret as unknown as string;
		const expireIn = this.environmentVariables.getValues().project.jwt
			.expireIn as unknown as string;

		const token = jwt.sign({ id: userData.id }, secret, {
			expiresIn: expireIn,
		});

		console.group();
		return { ...userData, token };
	}

	private comparePasswords(password: string, encrypted: string): boolean {
		console.group(`${this.className}:COMPARE_PASSWORD`);
		const response = bcrypt.compareSync(password, encrypted);
		console.groupEnd();
		return response;
	}

	async verifyAccessToken(id: string): Promise<void> {
		console.group(`${this.className}:VERIFY_PASSWORD`);
		if (!id) {
			console.error('Badly formed token');
			this.commonService.createError(
				ReasonPhrases.UNAUTHORIZED,
				StatusCodes.UNAUTHORIZED,
			);
		}

		const user = await this.userService.findById(id);
		if (!user) {
			console.error('User not found');
			this.commonService.createError(
				ReasonPhrases.UNAUTHORIZED,
				StatusCodes.UNAUTHORIZED,
			);
		}
		console.groupEnd();
	}
}

export default AuthService;

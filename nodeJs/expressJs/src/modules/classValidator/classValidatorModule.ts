import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import Actions from '../../enums/actions';
import CommonService from '../common/commonService';
import { StatusCodes } from 'http-status-codes';

class ClassValidatorModule {
	// eslint-disable-next-line no-use-before-define
	private static instance: ClassValidatorModule;

	private commonService: CommonService;

	private readonly className = 'CLASS_VALIDATOR_MODULE';

	// eslint-disable-next-line no-empty-function
	private constructor() {
		console.group(`${this.className}:CONSTRUCTOR`);
		this.commonService = CommonService.getInstance();
		console.groupEnd();
	}

	static getInstance() {
		console.group('CLASS_VALIDATOR_MODULE:GET_INSTANCE');
		if (!ClassValidatorModule.instance)
			ClassValidatorModule.instance = new ClassValidatorModule();
		console.groupEnd();
		return ClassValidatorModule.instance;
	}

	private buildValidatorOptions(): ValidatorOptions {
		console.group(`${this.className}:BUILD_VALIDATOR_OPTIONS`);
		const response = {
			enableDebugMessages: true,
			skipUndefinedProperties: false,
			skipNullProperties: false,
			skipMissingProperties: false,
			whitelist: false,
			forbidNonWhitelisted: true,
			stopAtFirstError: true,
		};
		console.groupEnd();
		return response;
	}

	async validate(data: object, action?: Actions): Promise<void> {
		console.group(`${this.className}:VALIDATE`);
		let options = {
			...this.buildValidatorOptions(),
		};
		if (action)
			options = {
				...options,
				groups: [action],
			};
		const result = await validate(data, options);
		if (Array.isArray(result) && result.length)
			this.createMessageError(result[0] as ValidationError);
	}

	createMessageError(data: ValidationError) {
		console.group(`${this.className}:CREATE_MESSAGE_ERROR`);
		const [errorMessage] = Object.values(data.constraints as object);
		console.groupEnd();
		this.commonService.createError(errorMessage, StatusCodes.BAD_REQUEST);
	}
}

export default ClassValidatorModule;

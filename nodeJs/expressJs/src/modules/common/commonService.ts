import { badRequest } from '@hapi/boom';
import RolePaginationDto from '../roles/dtos/rolePaginationDto';
import { StatusCodes } from 'http-status-codes';

export class CommonService {
	// eslint-disable-next-line no-use-before-define
	private static instance: CommonService;

	private readonly className = 'COMMON_SERVICES';

	// eslint-disable-next-line no-empty-function
	private constructor() {}

	static getInstance() {
		console.group(`COMMON_SERVICES:GET_INSTANCE`);
		if (!CommonService.instance) CommonService.instance = new CommonService();
		console.groupEnd();
		return CommonService.instance;
	}

	convertParametersIntoNumericalFormat({
		limit,
		page,
		...otherFields
	}: RolePaginationDto) {
		console.group(`${this.className}:CONVERT_PARAMETERS_INTO_NUMERICAL_FORMAT`);
		let newLimit, newPage;
		if (limit && typeof limit === 'string') newLimit = parseInt(limit, 10);
		if (page && typeof page === 'string') newPage = parseInt(page, 10);
		console.groupEnd();
		return {
			limit: newLimit,
			page: newPage,
			...otherFields,
		};
	}

	verifyFieldValue(
		fieldName: string,
		value: string,
		fieldType = 'string',
	): void {
		console.group(`${this.className}:VERIFY_FIELD_VALUE`);

		if (!value)
			throw new Error(
				`The value of the ${fieldName}:${value} field is necessary`,
			);

		if (!value || typeof value !== fieldType || value === '')
			throw new Error(
				`The ${fieldName} field is required and must be an ${fieldType} type format, value supplied: ${value}`,
			);

		console.groupEnd();
	}

	calculateSkip(page: number, limit: number): number {
		console.group(`${this.className}:CALCULATE_SKIP`);
		let skip = 0;
		if (page > 1) skip = (page - 1) * limit;
		console.groupEnd();
		return skip;
	}

	createError(message: string, statusCode = StatusCodes.BAD_REQUEST): void {
		console.group(`${this.className}:CREATE_ERROR`);
		console.groupEnd();
		throw badRequest(message, {
			statusCode,
		});
	}
}

export default CommonService;

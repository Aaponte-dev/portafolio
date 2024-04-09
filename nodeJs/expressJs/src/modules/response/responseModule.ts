import { NextFunction, Response } from 'express';
import { badRequest } from '@hapi/boom';
import { StatusCodes } from 'http-status-codes';

export class ResponseModule {
	// eslint-disable-next-line no-use-before-define
	private static instance: ResponseModule;

	// eslint-disable-next-line no-empty-function
	private constructor() {}

	static getInstance() {
		console.group(`RESPONSE_MODULE:GET_INSTANCE`);
		if (!ResponseModule.instance)
			ResponseModule.instance = new ResponseModule();
		console.groupEnd();
		return ResponseModule.instance;
	}

	static successOld(
		response: Response,
		message: unknown,
		status: number = StatusCodes.OK,
	) {
		console.group('RESPONSE_MODULE:SUCCESS');
		response.status(status).json({
			body: message,
		});
		console.groupEnd();
	}

	static success<T>(
		response: Response,
		data: T,
		status: number = StatusCodes.OK,
	) {
		console.group('RESPONSE_MODULE:SUCCESS');
		const responseModule = ResponseModule.getInstance();
		response.status(status).json(responseModule.buildSuccessBody<T>(data));
		console.groupEnd();
	}

	static error(next: NextFunction, message: string, details: string) {
		console.group('RESPONSE_MODULE:ERROR');
		console.error(details);
		next(badRequest(message));
		console.groupEnd();
	}

	private buildSuccessBody<T>(data: T) {
		console.group('RESPONSE_MODULE:ERROR');
		const response = {
			meta: {
				success: true,
				message: 'Request carried out correctly',
				timestamp: new Date(),
			},
			data,
		};
		console.groupEnd();
		return response;
	}
}

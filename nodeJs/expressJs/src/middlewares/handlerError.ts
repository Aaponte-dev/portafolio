import { NextFunction, Request, Response } from 'express';
import { Boom } from '@hapi/boom';
import { StatusCodes } from 'http-status-codes';

class HandlerError {
	// eslint-disable-next-line no-use-before-define
	private static instance: HandlerError;

	// eslint-disable-next-line no-empty-function
	private constructor() {}

	static getInstance() {
		console.group('HANDLER_ERROR:GET_INSTANCE');
		if (!HandlerError.instance) HandlerError.instance = new HandlerError();
		console.groupEnd();
		return HandlerError.instance;
	}

	logErrors(
		error: unknown,
		_request: Request,
		_response: Response,
		next: NextFunction,
	) {
		console.group(`HANDLER_ERROR:LOG_ERROR`);
		console.error(error);
		console.groupEnd();
		next(error);
	}

	boomErrorHandler(
		error: unknown,
		_request: Request,
		_response: Response,
		next: NextFunction,
	) {
		console.group(`HANDLER_ERROR:BOOM_ERROR_HANDLER`);
		if (error instanceof Boom) {
			const newError = error;
			const { output } = newError;
			console.groupEnd();
			_response.status(output.statusCode).json({
				meta: {
					success: false,
					message: output.payload.message,
					timestamp: new Date(),
				},
				data: {},
			});
		} else if (error instanceof Error) {
			console.groupEnd();
			next(error);
		}
	}

	errorHandler(
		error: Error,
		_request: Request,
		_response: Response,
		next: NextFunction,
	) {
		console.group(`HANDLER_ERROR:ERROR_HANDLER`);
		let errorMessage = 'Unprocessed error, check the logs';
		console.groupEnd();

		if (error.message) errorMessage = error.message;
		next(
			_response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				meta: {
					success: false,
					message: errorMessage,
					timestamp: new Date(),
				},
				data: {},
			}),
		);
	}
}

export default HandlerError;

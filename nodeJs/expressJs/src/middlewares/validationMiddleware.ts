import { NextFunction, Request, Response } from 'express';
import { badRequest } from '@hapi/boom';
import { Schema } from 'joi';

const validationMiddleware =
	(schema: Schema) => (_req: Request, _res: Response, next: NextFunction) => {
		const { error } = schema.validate(_req.body || _req.query);

		if (error)
			next(
				badRequest(
					error.details
						.map((element) => element.message)
						.concat()
						.toString(),
				),
			);
		next();
	};

export default validationMiddleware;

import Router, { Router as RouterResponse } from 'express';

class Routing {
	// eslint-disable-next-line no-use-before-define
	private static instance: Routing;

	// eslint-disable-next-line no-empty-function
	private constructor() {}

	static getInstance() {
		console.group(`ROUTING:GET_INSTANCE`);
		if (!Routing.instance) Routing.instance = new Routing();
		console.groupEnd();
		return Routing.instance;
	}

	static createRouting(): RouterResponse {
		console.group('ROUTING:CREATE_ROUTING');
		// eslint-disable-next-line new-cap
		const router = Router();
		console.groupEnd();
		return router;
	}
}

export default Routing;

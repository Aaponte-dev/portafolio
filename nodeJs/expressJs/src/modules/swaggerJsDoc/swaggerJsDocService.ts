import EnvironmentVariables from '../../configs/environmentVariables';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

class SwaggerJsDocService {
	// eslint-disable-next-line no-use-before-define
	private static instance: SwaggerJsDocService;

	private readonly environmentVariables: EnvironmentVariables;

	private readonly className = 'SWAGGER_JS_DOC_SERVICE';

	private constructor() {
		this.environmentVariables = EnvironmentVariables.getInstance();
	}

	static getInstance() {
		console.group(`SWAGGER_JS_DOC_SERVICE:GET_INSTANCE`);
		if (!SwaggerJsDocService.instance)
			SwaggerJsDocService.instance = new SwaggerJsDocService();
		console.groupEnd();
		return SwaggerJsDocService.instance;
	}

	setting() {
		console.group(`${this.className}:SETTING`);

		const port = this.environmentVariables.getValues().project.port;
		const response = {
			definition: {
				openapi: '3.1.0',
				info: {
					title: 'Product store api',
					summary:
						'This project presents an API Restful with functionalities for an online product store',
					contact: {
						name: 'Angel Aponte',
						email: 'aponte_14leonardo@hotmail.com',
					},
					license: {
						name: 'MIT',
					},
					version: '1.0.0',
				},
				servers: [{ url: `http://localhost:${port}/` }],
			},
			apis: [path.join(__dirname, '../../../src/routes/*.js')],
		};
		console.groupEnd();
		return swaggerJSDoc(response);
	}
}

export default SwaggerJsDocService;

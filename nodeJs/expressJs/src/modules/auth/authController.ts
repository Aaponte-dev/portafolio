class AuthController {
	// eslint-disable-next-line no-use-before-define
	private static instance: AuthController;

	// eslint-disable-next-line no-empty-function
	private constructor() {}

	static getInstance() {
		console.group('USER_SERVICE:GET_INSTANCE');
		if (!AuthController.instance)
			AuthController.instance = new AuthController();
		console.groupEnd();
		return AuthController.instance;
	}
}

export default AuthController;

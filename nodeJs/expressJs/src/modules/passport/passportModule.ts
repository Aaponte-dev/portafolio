import JwtStrategy from './strategy/jwtStrategy';
import LocalStrategy from './strategy/localStrategy';
import passport from 'passport';

class PassportModule {
	// eslint-disable-next-line no-use-before-define
	private static instance: PassportModule;

	private readonly className = 'PASSPORT_MODULE';

	static getInstance() {
		console.group('PASSPORT_MODULE:GET_INSTANCE');
		if (!PassportModule.instance)
			PassportModule.instance = new PassportModule();
		console.groupEnd();
		return PassportModule.instance;
	}

	loadStrategies() {
		console.group(`${this.className}:LOAD_STRATEGIES`);
		const localStrategy = LocalStrategy.getInstance();
		const jwtStrategy = JwtStrategy.getInstance();
		passport.use('local', localStrategy);
		passport.use('jwt', jwtStrategy);
		console.groupEnd();
	}
}

export default PassportModule;

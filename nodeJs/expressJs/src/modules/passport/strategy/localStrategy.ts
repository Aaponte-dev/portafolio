import AuthService from '../../auth/authService';
import { Strategy } from 'passport-local';

class LocalStrategy extends Strategy {
	// eslint-disable-next-line no-use-before-define
	private static instance: LocalStrategy;

	static getInstance() {
		console.group('LOCAL_STRATEGY:GET_INSTANCE');
		if (!LocalStrategy.instance)
			LocalStrategy.instance = new LocalStrategy(
				{
					usernameField: 'email',
					passwordField: 'password',
					passReqToCallback: true,
				},
				// eslint-disable-next-line consistent-return
				async (_req, email, password, done) => {
					try {
						const authService = AuthService.getInstance();
						const user = await authService.login({ email, password });
						_req.user = user;
						return done(null, user);
					} catch (error) {
						done(error);
					}
				},
			);
		console.groupEnd();
		return LocalStrategy.instance;
	}
}

export default LocalStrategy;

import {
	ExtractJwt,
	Strategy,
	StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import AuthService from '../../auth/authService';
import EnvironmentVariables from '../../../configs/environmentVariables';

class JwtStrategy extends Strategy {
	// eslint-disable-next-line no-use-before-define
	private static instance: JwtStrategy;

	static getInstance() {
		console.group('JWT_STRATEGY:GET_INSTANCE');
		const environment = EnvironmentVariables.getInstance();
		const secret = environment.getValues().project.jwt.secret;
		const options: StrategyOptionsWithoutRequest = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: secret as unknown as string,
		};
		if (!JwtStrategy.instance)
			JwtStrategy.instance = new JwtStrategy(options, async (jwtBody, done) => {
				try {
					const authService = AuthService.getInstance();
					await authService.verifyAccessToken(jwtBody.id);
					done(null, {});
				} catch (error) {
					done(error);
				}
			});
		console.groupEnd();
		return JwtStrategy.instance;
	}
}

export default JwtStrategy;

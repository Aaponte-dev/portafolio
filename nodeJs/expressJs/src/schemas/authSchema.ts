import Joi from 'joi';

const loginSchema = Joi.object({
	email: Joi.string().email().min(13).max(40).required(),
	password: Joi.string().min(8).max(20).required(),
});

export { loginSchema };

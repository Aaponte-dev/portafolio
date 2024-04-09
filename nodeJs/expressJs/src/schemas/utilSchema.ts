import Joi from 'joi';

const productNameSchema = Joi.object({
	productName: Joi.string().min(2).required(),
});

const roleNameSchema = Joi.object({
	roleName: Joi.string().min(5).max(15).required(),
});

const emailSchema = Joi.object({
	email: Joi.string().min(5).max(15).required(),
});

export { productNameSchema, roleNameSchema, emailSchema };

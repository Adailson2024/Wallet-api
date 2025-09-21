import Joi from 'joi';


export const usuarioSchema= Joi.object({
nome:Joi.string().required(),
email:Joi.string().email().required(),
senha:Joi.string().min(6).required()
});

export const usuarioLoginSchema= Joi.object({

email:Joi.string().email().required(),
senha:Joi.string().min(6).required()
});
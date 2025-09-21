import Joi from 'joi';
export const transacaoSchema = Joi.object({
        titulo: Joi.string().required(),
        ingredientes: Joi.string().required(),
        preparo: Joi.string().required(),
    });
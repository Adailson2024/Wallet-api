import Joi from 'joi';
export const transactionSchema = Joi.object({
        value: Joi.number()
        .precision(2) // limita a precisão para moedas
        .strict()
        .positive() // Garante que é um número positivo
        .required()
        .messages({ // Mensagens personalizadas para o 422
            'any.required': 'O campo valor é obrigatório.',
            'number.base': 'O valor deve ser um número flutuante.',
            'number.positive': 'O valor deve ser positivo.',
            'number.precision': 'O valor pode ter no máximo duas casas decimais.'
        }),
        description: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'any.required': 'O campo descrição é obrigatório.',
            'string.base': 'A descrição deve ser um texto.',
            'string.empty': 'A descrição não pode ser vazia.'
        }),
        type: Joi.string()
        .valid('deposit', 'withdraw') // Limita os valores aceitos
        .required()
        .messages({
            'any.required': 'O campo tipo é obrigatório.',
            'any.only': 'O tipo de transação deve ser "deposit" ou "withdraw".'
        })
    });

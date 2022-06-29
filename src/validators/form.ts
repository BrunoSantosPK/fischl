import { celebrate, Joi, Segments } from "celebrate";

const validator = {
    calc: celebrate({
        [Segments.BODY]: Joi.object().keys({
            questions: Joi.array().items(Joi.object().keys({
                id: Joi.number().min(1).required(),
                value: Joi.number().min(1).max(5).required()
            })).required()
        })
    })
};

export default validator;
import { celebrate, Joi, Segments } from "celebrate";
import { ResponseQuestion } from "../interfaces/form";

const validator = {
    calc: celebrate({
        [Segments.BODY]: Joi.object().keys({
            questions: Joi.array().required()
        })
    })
};

export default validator;
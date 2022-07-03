import joi from 'joi';

const newUserSchema = joi.object({
    name:joi.string().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().required()
})

export default newUserSchema
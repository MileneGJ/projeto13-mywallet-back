import joi from 'joi'

const transactionsSchema = joi.object({
    value:joi.string().regex(/^R\$[0,9]{1,}\,[0,9]{2}$/).required(),
    description:joi.string().required()
})

export default transactionsSchema
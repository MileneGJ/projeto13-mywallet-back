import joi from 'joi'

const transactionsSchema = joi.object({
    value:joi.string().regex(/^R\$[0-9]+\,[0-9]{2}$/).required(),
    description:joi.string().required(),
    type:joi.string().valid("entrada","saída").required()
})

export default transactionsSchema
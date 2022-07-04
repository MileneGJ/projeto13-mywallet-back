import newTransactionSchema from "../schemas/newTransactionSchema.js";
import dayjs from 'dayjs';

export default function validateTransaction(req, res, next) {
    const validation = newTransactionSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error)
    } else {
        res.locals.newTransaction = {
            date:dayjs(new Date()).format('DD/MM'),
            value:req.body.value,
            description:req.body.description,
            type:req.body.type
        }
        next()
    }
}
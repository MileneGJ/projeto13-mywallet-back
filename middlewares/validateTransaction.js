import { next } from 'express';
import newTransactionSchema from "../schemas/newTransactionSchema.js";

export default function validateTransaction(req, res) {
    const validation = newTransactionSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error)
    } else {
        res.locals.newTransaction = {
            value:req.body.value,
            description:req.body.description
        }
        next()
    }
}
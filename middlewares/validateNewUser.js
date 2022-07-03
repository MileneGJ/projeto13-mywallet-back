import bcrypt from 'bcrypt';
import {next} from 'express';
import newUserSchema from "../schemas/newUserSchema";

export default function validateNewUser (req,res) {
    const validation = newUserSchema.validate(req.body)
    if(validation.error){
        return res.status(422).send(validation.error)
    } else {
        let cryptPassword = bcrypt.hashSync(req.body.password, 10)
        res.locals.newUser={
                name: req.body.name,
                email: req.body.email,
                password: cryptPassword
        }
        next()
    }
}
import bcrypt from 'bcrypt';
import newUserSchema from "../schemas/newUserSchema.js";

export default function validateNewUser(req, res, next) {
    const validation = newUserSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error)
    } else {
        let cryptPassword = bcrypt.hashSync(req.body.password, 10)
        res.locals.newUser = {
            name: req.body.name,
            email: req.body.email,
            password: cryptPassword
        }
        next()
    }
}
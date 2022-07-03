import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../databases/mongodb.js';
import userSchema from "../schemas/userSchema.js";

export default async function validateUser(req, res, next) {
    const validation = userSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error)
    } else {
        const foundUser = await db.collection("users").findOne({
            email: req.body.email
        });

        if (foundUser && bcrypt.compareSync(req.body.password, foundUser.password)) {
            const token = uuidv4();
            res.locals.userSession = {
                userId: foundUser._id,
                token
            }
            next()
        } else {
            return res.status(401).send("E-mail ou senha incorretos")
        }
    }
}
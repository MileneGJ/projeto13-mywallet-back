import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import db from '../databases/mongodb.js';

export async function createUser (req, res) {

    // validations
    let cryptPassword = bcrypt.hashSync(req.body.password, 10)

    try {
        await db.collection("users").insertOne({
            name: req.body.name,
            email: req.body.email,
            password: cryptPassword
        });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.send(400);
    }
}

export async function verifyUser (req, res) {
    try {
        const foundUser = await db.collection("users").findOne({
            email: req.body.email
        });

        if (foundUser && bcrypt.compareSync(req.body.password, foundUser.password)) {
            const token = uuidv4();

            await db.collection("sessions").insertOne({
                userId: foundUser._id,
                token
            })
            return res.status(200).send({
                user: foundUser._id,
                token
            });
            
        } else {
            return res.status(401).send("E-mail ou senha incorretos")
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
import {db} from '../databases/mongodb.js';

export async function createUser(_, res) {
    try {
        await db.collection("users").insertOne(res.locals.newUser);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export async function signInUser(_, res) {
    try {
        await db.collection("sessions").insertOne(res.locals.userSession)
        return res.status(200).send({
            token:res.locals.userSession.token
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
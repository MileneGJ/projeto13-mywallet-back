import db from "../databases/mongodb.js";
import {next} from 'express';

export default async function validateToken (req,res) {
    const reqToken = req.headers.authorization.replace("Bearer: ","");
    const foundToken = await db.collection("sessions").findOne({token:reqToken});
    if(foundToken){
        res.locals.userID = foundToken._id
        next()
    } else {
        return res.sendStatus(401)
    }
}
import {db} from "../databases/mongodb.js";

export default async function validateToken(req, res, next) {
    let reqToken = req.headers.authorization.replace("Bearer: ","")
    try {
        const foundToken = await db.collection("sessions").findOne({ token: reqToken });
        res.locals.userID = foundToken.userId
        next()        
    } catch (error) {
        console.log(error);
        return res.sendStatus(401)        
    }
}
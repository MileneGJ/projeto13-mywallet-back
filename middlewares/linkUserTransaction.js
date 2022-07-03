import { db } from "../databases/mongodb.js";

export default async function linkUserTransaction(req, res, next) {
    try {
        const foundUser = await db.collection("users").findOne({ _id: res.locals.userID });
        const foundTransactions = await db.collection("transactions").findOne({ userID: res.locals.userID });
        if (foundUser && !foundTransactions) {
            res.locals.newUserTransaction = {
                userName: foundUser.name,
                userID: foundUser._id,
                transactions: [res.locals.newTransaction]
            }
            res.locals.actionTransaction = "insert"
            next();
        } else if (foundUser && foundTransactions) {
            res.locals.newUserTransaction = [...foundTransactions.transactions,res.locals.newTransaction]
            res.locals.actionTransaction = "update"
            next();
        } else {
            return res.sendStatus(422);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
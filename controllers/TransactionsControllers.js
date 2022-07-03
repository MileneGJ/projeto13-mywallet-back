import { db } from "../databases/mongodb.js";

export async function createTransaction(_, res) {
    try {
        if (res.locals.actionTransaction === "insert") {
            await db.collection("transactions").insertOne(res.locals.newUserTransaction);
        } else if (res.locals.actionTransaction === "update") {
            await db.collection("transactions").updateOne({
                userID: res.locals.userID
            }, {
                $set: {
                    transactions: res.locals.newUserTransaction
                }
            });
        }

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export async function listTransactions(_, res) {
    try {
        const allTransactions = await db.collection("transactions").find().toArray();
        return res.send(allTransactions);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
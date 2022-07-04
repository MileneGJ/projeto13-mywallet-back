import { db } from "../databases/mongodb.js";

export async function createTransaction(_, res) {
    try {
        const userTransactions = await db.collection("transactions").findOne({userID: res.locals.userID})
        await db.collection("transactions").updateOne({
            userID: res.locals.userID
        }, {
            $set: {
                transactions: [...userTransactions.transactions, res.locals.newTransaction]
            }
        });
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export async function listTransactions(_, res) {
    try {
        const allTransactions = await db.collection("transactions").findOne({
            userID: res.locals.userID
        });
        return res.send(allTransactions);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
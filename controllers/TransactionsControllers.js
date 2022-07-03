import db from "../databases/mongodb.js";

export async function createTransaction (_,res) {
    try {
        await db.collection("transactions").insertOne(res.locals.newTransaction);
        return res.sendStatus(201);     
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);        
    }
}

export async function listTransactions (_,res) {
    try {
        const allTransactions = await db.collection("transactions").find().toArray();
        return res.send(allTransactions);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
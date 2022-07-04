import { db } from "../databases/mongodb.js";

export default async function verifyNewTransaction(req, res, next) {
    try {
        const foundUser = await db.collection("users").findOne({ _id: res.locals.userID });
        const foundTransactions = await db.collection("transactions").findOne({ userID: res.locals.userID });
        if (foundUser && !foundTransactions) {
            await db.collection("transactions").insertOne({
                userName: foundUser.name,
                userID: foundUser._id,
                balance: 0,
                transactions: []
            });
            next();
        } else if (foundUser && foundTransactions) {
            if (foundTransactions.transactions.length > 0) {
                let sum = 0;
                foundTransactions.transactions.map(t => {
                    if(t.type==="entrada"){
                        sum += parseInt(t.value.replace("R$", "").replace(/\,/,/\./))
                    } else if (t.type==="saída"){
                        sum -= parseInt(t.value.replace("R$", "").replace(/\,/,/\./))
                    }
                });
                await db.collection("transactions").updateOne({
                    userID: res.locals.userID
                }, {
                    $set: {
                        balance: sum
                    }
                });
            }
            next();
        } else {
            return res.sendStatus(422);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
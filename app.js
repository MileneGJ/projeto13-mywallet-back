import express, { application } from "express";
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import {v4 as uuid} from 'uuid';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);
let db

app.post("/sign-up", async (req, res) => {

    // validations
    let cryptPassword = bcrypt.hashSync(req.body.password, 10)

    try {
        await client.connect();
        db = client.db(process.env.DATABASE);
        await db.collection("users").insertOne({
            name: req.body.name,
            email: req.body.email,
            password: cryptPassword
        });
        client.close()
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        client.close()
        res.send(400);
    }
});

app.post('/login',(req,res)=>{
    try {
        await client.connect();
        db = client.db(process.env.DATABASE);
        const foundUser = await db.collection("users").findOne({
            email: req.body.email
        });

        if(foundUser && bcrypt.compareSync(req.body.password,foundUser.password)){
            const token = uuid.v4();
        
            await db.collection("sessions").insertOne({
                userId: foundUser._id,
                token
            })

    res.send(token);
        } else {
            return res.status(401).send("E-mail ou senha incorretos")
        }



        client.close()
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        client.close()
        res.send(400);
    }
})

app.listen(process.env.PORT);
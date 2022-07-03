import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouters from '../routers/authRouters.js'

dotenv.config();

const app = express();
app.use(express.json(),cors());

app.use(authRouters)

app.listen(process.env.PORT,()=>{
    console.log(`Listening on ${process.env.PORT}`)
});
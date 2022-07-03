import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouters from '../routers/authRouters.js'
import transactionRouters from '../routers/transactionRouters.js'
import validateToken from '../middlewares/validateToken.js';

dotenv.config();

const app = express();
app.use(express.json(),cors());

app.use(authRouters)
app.use(validateToken)
app.use(transactionRouters)

app.listen(process.env.PORT,()=>{
    console.log(`Listening on ${process.env.PORT}`)
});
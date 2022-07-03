import { Router } from 'express';
import { createTransaction, listTransactions } from '../controllers/TransactionsControllers.js';
import validateTransaction from '../middlewares/validateTransaction.js';


const router = Router()

router.get("/transactions",listTransactions)
router.post("/transactions", validateTransaction, createTransaction)

export default router
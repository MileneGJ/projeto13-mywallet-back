import { Router } from 'express';
import { createTransaction, listTransactions } from '../controllers/TransactionsControllers.js';
import validateTransaction from '../middlewares/validateTransaction.js';
import verifyNewTransaction from '../middlewares/verifyNewTransaction.js';

const router = Router()

router.get("/transactions", verifyNewTransaction, listTransactions)
router.post("/transactions", validateTransaction, createTransaction)

export default router
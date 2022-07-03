import { Router } from 'express';
import { createTransaction, listTransactions } from '../controllers/TransactionsControllers.js';
import validateTransaction from '../middlewares/validateTransaction.js';
import linkUserTransaction from '../middlewares/linkUserTransaction.js';

const router = Router()

router.get("/transactions",listTransactions)
router.post("/transactions", validateTransaction, linkUserTransaction, createTransaction)

export default router
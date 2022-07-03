import { Router } from 'express';
import {createUser,verifyUser} from '../controllers/authControllers.js'

const router = Router();

router.post("/sign-up", createUser);
router.post('/login', verifyUser);

export default router